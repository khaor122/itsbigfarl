'use client'

import { Switch } from '@/components/ui/switch'
import { useState } from 'react'

type Props = {
  orderId: string
  initialStatus: 'pending' | 'delivered'
}

export function OrderStatusToggle({ orderId, initialStatus }: Props) {
  const [status, setStatus] = useState<'pending' | 'delivered'>(initialStatus)
  const [loading, setLoading] = useState(false)

  const toggleStatus = async (checked: boolean) => {
    const newStatus = checked ? 'delivered' : 'pending'
    setLoading(true)

    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })

      if (res.ok) setStatus(newStatus)
      else console.error('Failed to update status')
    } catch (err) {
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-2 mt-2">
      <Switch
        checked={status === 'delivered'}
        disabled={loading}
        onCheckedChange={toggleStatus}
      />
      <span>{status === 'delivered' ? 'Delivered' : 'Pending'}</span>
    </div>
  )
}
