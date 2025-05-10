// actions/order-actions.ts
"use server"

import { prisma } from "@/lib/prisma"

export async function getOrders() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
    })
    return { success: true, data: orders }
  } catch (error) {
    return { success: false, error: "Failed to load orders" }
  }
}

export async function markOrderDelivered(orderId: string) {
  try {
    await prisma.order.update({
      where: { id: orderId },
      data: { delivered: true },
    })
  } catch (error) {
    console.error("Failed to mark order delivered:", error)
  }
}
