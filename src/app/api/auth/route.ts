import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword, SESSION_COOKIE } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const { password } = await request.json();

  if (verifyPassword(password)) {
    const response = NextResponse.json({ success: true });
    response.cookies.set(SESSION_COOKIE, 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    });
    return response;
  }

  return NextResponse.json({ success: false, error: 'Wrong password' }, { status: 401 });
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete(SESSION_COOKIE);
  return response;
}
