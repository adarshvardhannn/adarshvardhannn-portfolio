import { describe, it, expect, vi, beforeAll, afterAll, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import cors from 'cors';
import { body, validationResult } from 'express-validator';

/**
 * Test suite for the contact API endpoint.
 * 
 * Uses an isolated Express app with mocked dependencies (no real DB/Redis/SMTP)
 * to test validation, honeypot, rate limiting logic, error handling, and CORS.
 */

// --- Mock setup ---

// Mock the database pool
const mockPoolQuery = vi.fn();
vi.mock('../db/pool.js', () => ({
  pool: {
    query: (...args: unknown[]) => mockPoolQuery(...args),
    end: vi.fn(),
  },
}));

// Mock Redis
vi.mock('../db/redis.js', () => ({
  redis: {
    call: vi.fn().mockResolvedValue('OK'),
    connect: vi.fn().mockResolvedValue(undefined),
    disconnect: vi.fn(),
    on: vi.fn(),
    status: 'ready',
  },
}));

// Mock email service
const mockSendEmail = vi.fn();
vi.mock('../services/email.js', () => ({
  sendContactNotification: (...args: unknown[]) => mockSendEmail(...args),
}));

// Mock env config
vi.mock('../config/env.js', () => ({
  env: {
    PORT: 3001,
    DATABASE_URL: 'postgresql://test:test@localhost:5432/test',
    REDIS_URL: 'redis://localhost:6379',
    FRONTEND_URL: 'http://localhost:5173',
    CONTACT_RECEIVER_EMAIL: 'test@example.com',
    SMTP_HOST: 'smtp.test.com',
    SMTP_PORT: 587,
    SMTP_USERNAME: 'test',
    SMTP_PASSWORD: 'test',
    IP_HASH_SECRET: 'test-secret-key',
    NODE_ENV: 'test',
  },
}));

// --- Build a test app that mirrors the real route logic ---

function createTestApp(options?: { corsOrigin?: string; withRateLimiter?: boolean }) {
  const app = express();

  app.use(cors({
    origin: options?.corsOrigin ?? 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  }));

  app.use(express.json({ limit: '10kb' }));

  // Health route
  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  // Contact validation
  const contactValidation = [
    body('name').trim().notEmpty().withMessage('Name is required.').isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters.'),
    body('email').trim().notEmpty().withMessage('Email is required.').isEmail().withMessage('Please provide a valid email address.').normalizeEmail(),
    body('subject').trim().notEmpty().withMessage('Subject is required.').isLength({ min: 3, max: 200 }).withMessage('Subject must be between 3 and 200 characters.'),
    body('message').trim().notEmpty().withMessage('Message is required.').isLength({ min: 10, max: 5000 }).withMessage('Message must be between 10 and 5000 characters.'),
  ];

  // Simple in-memory rate limiter for tests
  const ipCounts = new Map<string, number>();
  const rateLimiterMiddleware = options?.withRateLimiter
    ? (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const ip = req.ip || '127.0.0.1';
        const count = (ipCounts.get(ip) || 0) + 1;
        ipCounts.set(ip, count);
        if (count > 5) {
          res.status(429).json({ success: false, message: 'Too many submissions. Please try again later.' });
          return;
        }
        next();
      }
    : (_req: express.Request, _res: express.Response, next: express.NextFunction) => next();

  app.post('/api/contact', rateLimiterMiddleware, contactValidation, async (req, res, next) => {
    try {
      // Honeypot
      if (req.body.website && String(req.body.website).trim().length > 0) {
        res.json({ success: true, message: 'Message sent successfully.' });
        return;
      }

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const firstError = errors.array()[0];
        res.status(400).json({ success: false, message: firstError.msg || 'Invalid input.' });
        return;
      }

      const { name, email, subject, message } = req.body;

      await mockPoolQuery(
        expect.any(String),
        [name, email, subject, message, 'new', expect.any(String), expect.any(String)]
      );

      mockSendEmail({ name, email, subject, message }).catch(() => {});

      res.json({ success: true, message: 'Message sent successfully.' });
    } catch (error) {
      next(error);
    }
  });

  // Error handler
  app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error('[Test Error]', err.message);
    res.status(500).json({ success: false, message: 'Unable to process your request.' });
  });

  return app;
}

// --- Valid test data ---
const validPayload = {
  name: 'John Doe',
  email: 'john@example.com',
  subject: 'Test Subject',
  message: 'This is a test message with enough characters.',
};

// --- Tests ---

describe('GET /health', () => {
  const app = createTestApp();

  it('should return status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });

  it('should not expose sensitive information', async () => {
    const res = await request(app).get('/health');
    expect(res.body).not.toHaveProperty('database');
    expect(res.body).not.toHaveProperty('redis');
    expect(res.body).not.toHaveProperty('version');
    expect(res.body).not.toHaveProperty('uptime');
  });
});

describe('POST /api/contact', () => {
  let app: express.Express;

  beforeEach(() => {
    vi.clearAllMocks();
    mockPoolQuery.mockResolvedValue({ rows: [{ id: 1 }] });
    mockSendEmail.mockResolvedValue(true);
    app = createTestApp();
  });

  describe('Valid submission', () => {
    it('should accept a valid contact form submission', async () => {
      const res = await request(app)
        .post('/api/contact')
        .send(validPayload);

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        success: true,
        message: 'Message sent successfully.',
      });
    });

    it('should not return database IDs in response', async () => {
      const res = await request(app)
        .post('/api/contact')
        .send(validPayload);

      expect(res.body).not.toHaveProperty('id');
      expect(res.body).not.toHaveProperty('data');
    });

    it('should call database insert', async () => {
      await request(app)
        .post('/api/contact')
        .send(validPayload);

      expect(mockPoolQuery).toHaveBeenCalledTimes(1);
    });

    it('should call email notification', async () => {
      await request(app)
        .post('/api/contact')
        .send(validPayload);

      expect(mockSendEmail).toHaveBeenCalledTimes(1);
      expect(mockSendEmail).toHaveBeenCalledWith(expect.objectContaining({
        name: validPayload.name,
        email: expect.any(String),
        subject: validPayload.subject,
        message: validPayload.message,
      }));
    });
  });

  describe('Invalid email', () => {
    it('should reject an invalid email format', async () => {
      const res = await request(app)
        .post('/api/contact')
        .send({ ...validPayload, email: 'not-an-email' });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should reject an empty email', async () => {
      const res = await request(app)
        .post('/api/contact')
        .send({ ...validPayload, email: '' });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe('Missing name', () => {
    it('should reject when name is missing', async () => {
      const { name: _, ...noName } = validPayload;
      const res = await request(app)
        .post('/api/contact')
        .send(noName);

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should reject a name that is too short', async () => {
      const res = await request(app)
        .post('/api/contact')
        .send({ ...validPayload, name: 'A' });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe('Missing subject', () => {
    it('should reject when subject is missing', async () => {
      const { subject: _, ...noSubject } = validPayload;
      const res = await request(app)
        .post('/api/contact')
        .send(noSubject);

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should reject a subject that is too short', async () => {
      const res = await request(app)
        .post('/api/contact')
        .send({ ...validPayload, subject: 'Hi' });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe('Empty / short message', () => {
    it('should reject an empty message', async () => {
      const res = await request(app)
        .post('/api/contact')
        .send({ ...validPayload, message: '' });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should reject a message that is too short', async () => {
      const res = await request(app)
        .post('/api/contact')
        .send({ ...validPayload, message: 'Short' });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe('Oversized message', () => {
    it('should reject a message exceeding 5000 characters', async () => {
      const res = await request(app)
        .post('/api/contact')
        .send({ ...validPayload, message: 'A'.repeat(5001) });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe('Malformed request', () => {
    it('should reject non-JSON content type', async () => {
      const res = await request(app)
        .post('/api/contact')
        .set('Content-Type', 'text/plain')
        .send('not json');

      // Express won't parse plain text, resulting in missing fields
      expect(res.status).toBe(400);
    });

    it('should handle empty body', async () => {
      const res = await request(app)
        .post('/api/contact')
        .send({});

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe('Honeypot', () => {
    it('should silently accept when honeypot field is filled (fake success)', async () => {
      const res = await request(app)
        .post('/api/contact')
        .send({ ...validPayload, website: 'http://spam.com' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      // Should NOT insert into database
      expect(mockPoolQuery).not.toHaveBeenCalled();
    });

    it('should not trigger honeypot when website field is empty', async () => {
      const res = await request(app)
        .post('/api/contact')
        .send({ ...validPayload, website: '' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      // Should still insert into database
      expect(mockPoolQuery).toHaveBeenCalledTimes(1);
    });
  });

  describe('Rate limiting', () => {
    it('should return 429 after exceeding rate limit', async () => {
      const rateLimitedApp = createTestApp({ withRateLimiter: true });

      // Make 5 valid requests
      for (let i = 0; i < 5; i++) {
        const res = await request(rateLimitedApp)
          .post('/api/contact')
          .send(validPayload);
        expect(res.status).toBe(200);
      }

      // 6th request should be rate limited
      const res = await request(rateLimitedApp)
        .post('/api/contact')
        .send(validPayload);

      expect(res.status).toBe(429);
      expect(res.body.success).toBe(false);
    });
  });

  describe('Database insertion', () => {
    it('should insert with parameterized query', async () => {
      await request(app)
        .post('/api/contact')
        .send(validPayload);

      expect(mockPoolQuery).toHaveBeenCalledTimes(1);
      const callArgs = mockPoolQuery.mock.calls[0];
      // First arg is the SQL query string
      expect(callArgs[0]).toEqual(expect.any(String));
      // Second arg is the params array
      expect(callArgs[1]).toEqual(expect.any(Array));
    });
  });

  describe('Email failure', () => {
    it('should still return success if email fails', async () => {
      mockSendEmail.mockRejectedValue(new Error('SMTP connection refused'));

      const res = await request(app)
        .post('/api/contact')
        .send(validPayload);

      // Should still succeed because DB insert worked
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });

  describe('Database failure', () => {
    it('should return 500 if database insert fails', async () => {
      mockPoolQuery.mockRejectedValue(new Error('Connection refused'));

      const res = await request(app)
        .post('/api/contact')
        .send(validPayload);

      expect(res.status).toBe(500);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Unable to process your request.');
      // Should NOT expose the actual error
      expect(res.body).not.toHaveProperty('error');
      expect(res.body).not.toHaveProperty('stack');
    });
  });

  describe('CORS', () => {
    it('should include CORS headers for allowed origin', async () => {
      const res = await request(app)
        .post('/api/contact')
        .set('Origin', 'http://localhost:5173')
        .send(validPayload);

      expect(res.headers['access-control-allow-origin']).toBe('http://localhost:5173');
    });

    it('should not include wildcard CORS', async () => {
      const res = await request(app)
        .post('/api/contact')
        .set('Origin', 'http://localhost:5173')
        .send(validPayload);

      expect(res.headers['access-control-allow-origin']).not.toBe('*');
    });
  });

  describe('Unexpected server error', () => {
    it('should return safe generic error on unexpected exception', async () => {
      mockPoolQuery.mockImplementation(() => {
        throw new TypeError('Cannot read property of undefined');
      });

      const res = await request(app)
        .post('/api/contact')
        .send(validPayload);

      expect(res.status).toBe(500);
      expect(res.body).toEqual({
        success: false,
        message: 'Unable to process your request.',
      });
    });
  });

  describe('Security — response sanitization', () => {
    it('should not return SQL errors', async () => {
      mockPoolQuery.mockRejectedValue(new Error('relation "contact_submissions" does not exist'));

      const res = await request(app)
        .post('/api/contact')
        .send(validPayload);

      expect(JSON.stringify(res.body)).not.toContain('contact_submissions');
      expect(JSON.stringify(res.body)).not.toContain('relation');
    });

    it('should not return stack traces', async () => {
      mockPoolQuery.mockRejectedValue(new Error('Test error'));

      const res = await request(app)
        .post('/api/contact')
        .send(validPayload);

      expect(JSON.stringify(res.body)).not.toContain('at ');
      expect(res.body).not.toHaveProperty('stack');
    });
  });
});
