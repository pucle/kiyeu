import { createHmac } from 'crypto';

const SECRET = process.env.OWNER_SECRET || 'fallback_secret';

export function createOwnerToken(): string {
  const timestamp = Date.now().toString();
  const hmac = createHmac('sha256', SECRET).update(timestamp).digest('hex');
  return `${timestamp}.${hmac}`;
}

export function verifyOwnerToken(token: string): boolean {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const [timestamp, hmac] = parts;
  const expected = createHmac('sha256', SECRET).update(timestamp).digest('hex');
  if (hmac !== expected) return false;
  // Token valid for 7 days
  const age = Date.now() - parseInt(timestamp, 10);
  return age < 7 * 24 * 60 * 60 * 1000;
}
