import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';
export async function GET(req: NextRequest) {
  const cookieStore = cookies();
  const session = cookieStore.get('sbc_session');

  if (session && session.value === 'authenticated') {
    return NextResponse.json({ authenticated: true }, { status: 200 });
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}
