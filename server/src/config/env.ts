import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load .env from the project root (parent of server/)
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

interface EnvConfig {
  PORT: number;
  DATABASE_URL: string;
  REDIS_URL: string;
  FRONTEND_URL: string;
  CONTACT_RECEIVER_EMAIL: string;
  SMTP_HOST: string;
  SMTP_PORT: number;
  SMTP_USERNAME: string;
  SMTP_PASSWORD: string;
  IP_HASH_SECRET: string;
  NODE_ENV: string;
}

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export const env: EnvConfig = {
  PORT: parseInt(process.env.PORT || '3001', 10),
  DATABASE_URL: requireEnv('DATABASE_URL'),
  REDIS_URL: requireEnv('REDIS_URL'),
  FRONTEND_URL: requireEnv('FRONTEND_URL'),
  CONTACT_RECEIVER_EMAIL: requireEnv('CONTACT_RECEIVER_EMAIL'),
  SMTP_HOST: requireEnv('SMTP_HOST'),
  SMTP_PORT: parseInt(process.env.SMTP_PORT || '587', 10),
  SMTP_USERNAME: requireEnv('SMTP_USERNAME'),
  SMTP_PASSWORD: requireEnv('SMTP_PASSWORD'),
  IP_HASH_SECRET: requireEnv('IP_HASH_SECRET'),
  NODE_ENV: process.env.NODE_ENV || 'development',
};
