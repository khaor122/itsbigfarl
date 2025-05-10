"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"

export default function MarkDeliveredButton({ orderId }: { orderId: string }) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const markAsDelivered = async () => {
    startTransition(async () => {
      const res = await fetch(`/api/admin/orders/${orderId}/mark-delivered`, {
        method: "POST",
      })

      if (res.ok) {
        router.refresh()
      } else {
        alert("Failed to mark as delivered.")
      }
    })
  }

  return (
    <button
      onClick={markAsDelivered}
      disabled={isPending}
      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
    >
      {isPending ? "Marking..." : "Mark Delivered"}
    </button>
  )
}
