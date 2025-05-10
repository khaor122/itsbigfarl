// lib/auth.ts
import { SignJWT, jwtVerify } from 'jose';
import { NextRequest } from 'next/server';  // You need this for working with the Next.js API routes

const JWT_SECRET = process.env.JWT_SECRET || process.env.NEXT_PUBLIC_JWT_SECRET;
if (!JWT_SECRET) throw new Error('JWT_SECRET is not defined');

const encoder = new TextEncoder();
const key = encoder.encode(JWT_SECRET);

// Create JWT
export async function createJWT(payload: { id: number; email: string; role: string }) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1d')
    .sign(key);
}

// Verify JWT
export async function verifyJWT(token: string): Promise<{ id: number; email: string; role: string } | null> {
  try {
    const { payload } = await jwtVerify(token, key);
    if (
      typeof payload === 'object' &&
      'id' in payload &&
      'email' in payload &&
      'role' in payload
    ) {
      return payload as { id: number; email: string; role: string };
    }
    return null;
  } catch (err) {
    console.error('JWT verification failed:', err);
    return null;
  }
}

// Admin Authentication Check (From the cookies)
export async function isAdminAuthenticated(req: NextRequest) {
  const token = req.cookies.get('admin-token')?.value;

  if (!token) return false;  // No token means not authenticated

  const payload = await verifyJWT(token);
  if (payload?.role === 'admin') {
    return true;  // Only allow admins
  }

  return false;  // Invalid or non-admin role
}
