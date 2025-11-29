import { NextResponse } from 'next/server';
import crypto from 'crypto';

const DEFAULT_FORM_ENDPOINT = 'https://formspree.io/f/xrbajroz';
const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT || DEFAULT_FORM_ENDPOINT;

function verifyCaptcha({ a, b, expiry, sig, answer }: { a: number; b: number; expiry: number; sig: string; answer: string | number }) {
  try {
    const secret = process.env.CAPTCHA_SECRET || 'dev-captcha-secret';
    const h = crypto.createHmac('sha256', secret);
    h.update(`${a}:${b}:${expiry}`);
    const expected = h.digest('hex');
    if (expected !== sig) return { ok: false, reason: 'invalid-signature' };
    if (Date.now() > Number(expiry)) return { ok: false, reason: 'expired' };
    const expectedAnswer = Number(a) + Number(b);
    if (Number(answer) !== expectedAnswer) return { ok: false, reason: 'wrong-answer' };
    return { ok: true };
  } catch (err) {
    return { ok: false, reason: 'error' };
  }
}

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const { name, email, message, _subject } = payload as any;

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, message: 'Missing fields' }, { status: 400 });
    }

    // Verify captcha if provided
    const { captchaAnswer, captchaA, captchaB, captchaExpiry, captchaSig } = payload as any;
    if (!captchaAnswer || !captchaA || !captchaB || !captchaExpiry || !captchaSig) {
      return NextResponse.json({ ok: false, message: 'Captcha required' }, { status: 400 });
    }

    const v = verifyCaptcha({ a: Number(captchaA), b: Number(captchaB), expiry: Number(captchaExpiry), sig: String(captchaSig), answer: captchaAnswer });
    if (!v.ok) {
      return NextResponse.json({ ok: false, message: 'Captcha verification failed' }, { status: 400 });
    }

    // Forward the request to Formspree from the server to keep the API key secret
    const resp = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        // Use server-side env var (do NOT expose this to the client)
        'Formspree-Api-Key': process.env.FORMSPREE_API_KEY || '',
      },
      body: new URLSearchParams({ name, email, message, _subject }),
    });

    const text = await resp.text();

    if (!resp.ok) {
      return NextResponse.json({ ok: false, message: text || 'Upstream error' }, { status: resp.status });
    }

    return NextResponse.json({ ok: true, message: 'Sent' });
  } catch (err) {
    // Avoid leaking error details to the client
    return NextResponse.json({ ok: false, message: 'Server error' }, { status: 500 });
  }
}
