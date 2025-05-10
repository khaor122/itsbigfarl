import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';


export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const orderId = params.id;
    await prisma.order.update({
      where: { id: orderId },
      data: { delivered: true },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to mark delivered:", error);
    return NextResponse.json({ success: false, error: "Could not update order" }, { status: 500 });
  }
}
