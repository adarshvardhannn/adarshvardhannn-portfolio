import type { Request, Response, NextFunction } from 'express';

/**
 * Centralized error handling middleware.
 * Logs detailed errors server-side but returns only safe generic messages.
 */
export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  // Log the full error server-side
  console.error('[Error]', {
    message: err.message,
    stack: err.stack,
    timestamp: new Date().toISOString(),
  });

  // Never expose internal details to the client
  res.status(500).json({
    success: false,
    message: 'Unable to process your request.',
  });
}
