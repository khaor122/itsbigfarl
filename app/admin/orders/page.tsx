// app/admin/orders/page.tsx
import { getOrders } from "@/actions/order-actions"
import { formatDistanceToNow } from "date-fns"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import MarkDeliveredButton from "./MarkDeliveredButton"

export default async function OrdersPage() {
  const { success, data: orders, error } = await getOrders()

  if (!success) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Orders</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Orders</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableCaption>List of user orders</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Submission ID</TableHead>
              <TableHead>Package</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ordered</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No orders yet
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.submissionId}</TableCell>
                  <TableCell>{order.packageName}</TableCell>
                  <TableCell>${order.amount}</TableCell>
                  <TableCell>{order.delivered ? "Delivered" : "Pending"}</TableCell>
                  <TableCell>{formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}</TableCell>
                  <TableCell>
                    {!order.delivered && <MarkDeliveredButton orderId={order.id} />}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
