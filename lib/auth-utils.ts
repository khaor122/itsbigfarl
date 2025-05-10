// lib/auth-utils.ts
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';

const SECRET = process.env.AUTH_SECRET || 'super-secret-key'; // Use a secure key in production

export async function getAdminToken(): Promise<string | null> {
  const cookieStore = await cookies(); // ✅ Await it
  const token = cookieStore.get('admin-token')?.value || null;
  return token;
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const token = await getAdminToken(); // ✅ Await it
  if (!token) return false;

  try {
    const payload = verify(token, SECRET) as { role: string };
    return payload.role === 'admin';
  } catch {
    return false;
  }
}
