import crypto from 'node:crypto';

/**
 * Creates an HMAC-SHA256 hash of the given value using a secret key.
 * Used to hash IP addresses and user-agents for privacy-preserving storage.
 */
export function hmacHash(value: string, secret: string): string {
  return crypto.createHmac('sha256', secret).update(value).digest('hex');
}
