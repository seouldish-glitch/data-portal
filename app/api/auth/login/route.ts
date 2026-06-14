import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    const envHash = process.env.DASHBOARD_PASSWORD_HASH;
    const envSalt = process.env.DASHBOARD_PASSWORD_SALT || 'sbc_portal_salt';

    if (!password) {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 });
    }

    // Hash the input password using SHA-256 and the salt from environment variables
    const inputHash = crypto
      .createHmac('sha256', envSalt)
      .update(password)
      .digest('hex');

    // For safety, let's compare both the HMAC (salted) hash and standard SHA-256 (no salt) hash
    const fallbackHash = crypto
      .createHash('sha256')
      .update(password)
      .digest('hex');

    const isValid = inputHash === envHash || fallbackHash === envHash;

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    // Set HTTP-only session cookie
    const cookieStore = cookies();
    cookieStore.set('sbc_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });

    return NextResponse.json({ success: true, message: 'Logged in successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
