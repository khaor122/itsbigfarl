// app/admin/page.tsx

import { prisma } from '@/lib/prisma'
import AdminClientView from './_components/AdminClientView'

type FilterParams = {
  reference?: string
  emailStatus?: string
}

export default async function AdminDashboard({ searchParams }: { searchParams?: FilterParams }) {
  const { reference, emailStatus } = searchParams || {}

  const where = {
    ...(reference ? { reference } : {}),
    ...(emailStatus ? { emailStatus } : {}),
  }

  const submissions = await prisma.submission.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  })

  return <AdminClientView submissions={submissions} />
}
