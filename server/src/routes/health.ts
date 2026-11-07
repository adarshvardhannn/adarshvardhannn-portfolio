import { Router } from 'express';

const router = Router();

/**
 * GET /health
 * Simple health check endpoint. Does not expose infrastructure details.
 */
router.get('/', (_req, res) => {
  res.json({ status: 'ok' });
});

export default router;
