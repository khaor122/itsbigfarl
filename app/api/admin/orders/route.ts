// app/api/admin/orders/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdminAuthenticated } from '@/lib/auth-utils';

export async function GET() {
  const authorized = await isAdminAuthenticated();
  if (!authorized) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const orders = await prisma.order.findMany({
    include: { submission: true },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(orders);
}
