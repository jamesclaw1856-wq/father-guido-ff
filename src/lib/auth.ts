import { cookies } from 'next/headers';

const APP_PASSWORD = process.env.APP_PASSWORD || 'fatherguido2026';
const SESSION_COOKIE = 'ff_session';

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE);
  return session?.value === 'authenticated';
}

export function verifyPassword(password: string): boolean {
  return password === APP_PASSWORD;
}

export { SESSION_COOKIE };
