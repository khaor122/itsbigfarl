// app/api/admin/orders/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyJWT } from '@/lib/auth';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const token = req.cookies.get('token')?.value;
  const payload = token ? verifyJWT(token) : null;

  if (!payload || payload.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { status } = await req.json();

  const updated = await prisma.order.update({
    where: { id: params.id },
    data: { status },
    include: {
      submission: true, // ensure updated response includes related submission
    },
  });

  return NextResponse.json(updated);
}
