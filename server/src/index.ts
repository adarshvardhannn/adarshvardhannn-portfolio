import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import hpp from 'hpp';
import { env } from './config/env.js';
import { errorHandler } from './middleware/errorHandler.js';
import contactRouter from './routes/contact.js';
import healthRouter from './routes/health.js';
import { pool } from './db/pool.js';
import { redis } from './db/redis.js';

const app = express();

// --- Security headers ---
app.use(helmet());

// --- CORS: allow only the portfolio frontend ---
app.use(cors({
  origin: env.FRONTEND_URL,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: false,
}));

// --- Body parsing with size limit (10KB) ---
app.use(express.json({ limit: '10kb' }));

// --- HTTP parameter pollution protection ---
app.use(hpp());

// --- Trust first proxy (for X-Forwarded-For) ---
app.set('trust proxy', 1);

// --- Routes ---
app.use('/health', healthRouter);
app.use('/api/contact', contactRouter);

// --- Centralized error handler (must be last) ---
app.use(errorHandler);

// --- Start server ---
const server = app.listen(env.PORT, () => {
  console.log(`[Server] Running on port ${env.PORT} (${env.NODE_ENV})`);
});

// --- Connect Redis eagerly ---
redis.connect().catch((err) => {
  console.error('[Redis] Initial connection failed:', err.message);
});

// --- Graceful shutdown ---
const shutdown = async (signal: string) => {
  console.log(`\n[Server] ${signal} received. Shutting down gracefully...`);

  server.close(async () => {
    try {
      await pool.end();
      console.log('[PostgreSQL] Pool closed.');
    } catch (err) {
      console.error('[PostgreSQL] Error closing pool:', err);
    }

    try {
      redis.disconnect();
      console.log('[Redis] Disconnected.');
    } catch (err) {
      console.error('[Redis] Error disconnecting:', err);
    }

    process.exit(0);
  });

  // Force shutdown after 10 seconds
  setTimeout(() => {
    console.error('[Server] Forced shutdown after timeout.');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

export default app;
