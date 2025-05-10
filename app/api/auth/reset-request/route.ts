// app/api/auth/reset-request/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Adjust if your Prisma client is in a different path
import { sendResetEmail } from '@/lib/sendResetEmail';
import { randomBytes } from 'crypto';

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  // For security, don't reveal whether the user exists
  if (!user) {
    return NextResponse.json({ message: 'If this email is registered, a reset link has been sent.' });
  }

  // Generate a secure token and expiration
  const token = randomBytes(32).toString('hex');
  const expiry = new Date(Date.now() + 1000 * 60 * 60); // 1 hour from now

  await prisma.user.update({
    where: { email },
    data: {
      resetToken: token,
      resetTokenExpiry: expiry,
    },
  });

  await sendResetEmail(email, token);

  return NextResponse.json({ message: 'If this email is registered, a reset link has been sent.' });
}
