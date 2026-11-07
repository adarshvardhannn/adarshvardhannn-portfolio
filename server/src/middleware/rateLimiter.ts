import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import { redis } from '../db/redis.js';

/**
 * Redis-backed rate limiter for the contact endpoint.
 * Allows 5 submissions per IP per hour.
 */
export const contactRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  store: new RedisStore({
    // Use ioredis sendCommand to satisfy rate-limit-redis interface
    sendCommand: (...args: string[]) => redis.call(...args) as never,
  }),
  message: {
    success: false,
    message: 'Too many submissions. Please try again later.',
  },
  keyGenerator: (req) => {
    // Use X-Forwarded-For behind a proxy, else fall back to socket IP
    const forwarded = req.headers['x-forwarded-for'];
    if (typeof forwarded === 'string') {
      return forwarded.split(',')[0].trim();
    }
    return req.ip || req.socket.remoteAddress || 'unknown';
  },
});
