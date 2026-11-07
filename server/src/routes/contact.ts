import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { pool } from '../db/pool.js';
import { hmacHash } from '../utils/hash.js';
import { env } from '../config/env.js';
import { sendContactNotification } from '../services/email.js';
import { contactRateLimiter } from '../middleware/rateLimiter.js';

const router = Router();

/**
 * Validation rules for contact form fields.
 * All inputs are trimmed server-side. Never rely on frontend validation.
 */
const contactValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required.')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters.'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Please provide a valid email address.')
    .normalizeEmail(),
  body('subject')
    .trim()
    .notEmpty().withMessage('Subject is required.')
    .isLength({ min: 3, max: 200 }).withMessage('Subject must be between 3 and 200 characters.'),
  body('message')
    .trim()
    .notEmpty().withMessage('Message is required.')
    .isLength({ min: 10, max: 5000 }).withMessage('Message must be between 10 and 5000 characters.'),
];

/**
 * POST /api/contact
 * 
 * Receives contact form submissions, validates, stores in PostgreSQL,
 * and sends email notification.
 */
router.post(
  '/',
  contactRateLimiter,
  contactValidation,
  async (req, res, next) => {
    try {
      // --- Honeypot check ---
      // If the hidden "website" field has a value, it's a bot.
      // Return a fake success response to avoid revealing the trap.
      if (req.body.website && String(req.body.website).trim().length > 0) {
        res.json({
          success: true,
          message: 'Message sent successfully.',
        });
        return;
      }

      // --- Validation ---
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const firstError = errors.array()[0];
        res.status(400).json({
          success: false,
          message: firstError.msg || 'Invalid input.',
        });
        return;
      }

      const { name, email, subject, message } = req.body;

      // --- Hash IP and User-Agent for privacy ---
      const rawIp = req.headers['x-forwarded-for']
        ? String(req.headers['x-forwarded-for']).split(',')[0].trim()
        : req.ip || req.socket.remoteAddress || 'unknown';
      const ipHash = hmacHash(rawIp, env.IP_HASH_SECRET);

      const rawUserAgent = req.headers['user-agent'] || 'unknown';
      const userAgentHash = hmacHash(rawUserAgent, env.IP_HASH_SECRET);

      // --- Insert into PostgreSQL (parameterized query) ---
      const insertQuery = `
        INSERT INTO contact_submissions (name, email, subject, message, status, ip_hash, user_agent_hash)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id
      `;
      await pool.query(insertQuery, [
        name,
        email,
        subject,
        message,
        'new',
        ipHash,
        userAgentHash,
      ]);

      // --- Send email notification (fire-and-forget) ---
      // Even if email fails, the submission is already safely stored.
      sendContactNotification({ name, email, subject, message }).catch((err) => {
        console.error('[Contact] Email notification error (non-blocking):', err);
      });

      res.json({
        success: true,
        message: 'Message sent successfully.',
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
