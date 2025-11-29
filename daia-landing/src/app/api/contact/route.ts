import { NextResponse } from 'next/server';

const DEFAULT_FORM_ENDPOINT = 'https://formspree.io/f/xrbajroz';
const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT || DEFAULT_FORM_ENDPOINT;

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const { name, email, message, _subject } = payload;

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, message: 'Missing fields' }, { status: 400 });
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

    // Detect if Formspree is asking for reCAPTCHA (HTML or message contains captcha indicators)
    const lower = (text || '').toLowerCase();
    const wantsRecaptcha = lower.includes('recaptcha') || lower.includes('g-recaptcha') || lower.includes('captcha');
    if (wantsRecaptcha) {
      // Inform the client to show the 'gracias' page (or a captcha flow) — we'll use a flag
      return NextResponse.json({ ok: true, recaptcha: true, message: 'reCAPTCHA required' });
    }

    if (!resp.ok) {
      return NextResponse.json({ ok: false, message: text || 'Upstream error' }, { status: resp.status });
    }

    return NextResponse.json({ ok: true, message: 'Sent' });
  } catch (err) {
    // Avoid leaking error details to the client
    return NextResponse.json({ ok: false, message: 'Server error' }, { status: 500 });
  }
}
