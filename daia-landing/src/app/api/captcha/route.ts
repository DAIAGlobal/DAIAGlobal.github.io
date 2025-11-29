import { NextResponse } from 'next/server';
import crypto from 'crypto';

// Returns a small math captcha and a server-signed token so clients cannot tamper the challenge.
export function GET() {
  const a = Math.floor(Math.random() * 8) + 1; // 1..8
  const b = Math.floor(Math.random() * 8) + 1; // 1..8
  const expiry = Date.now() + 1000 * 60 * 5; // 5 minutes

  const secret = process.env.CAPTCHA_SECRET || 'dev-captcha-secret';
  const h = crypto.createHmac('sha256', secret);
  h.update(`${a}:${b}:${expiry}`);
  const sig = h.digest('hex');

  return NextResponse.json({ a, b, expiry, sig });
}
