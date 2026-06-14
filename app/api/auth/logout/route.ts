import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  const cookieStore = cookies();
  cookieStore.delete('sbc_session');

  return NextResponse.json({ success: true, message: 'Logged out successfully' }, { status: 200 });
}
