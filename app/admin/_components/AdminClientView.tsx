'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { saveAs } from 'file-saver'
import * as Papa from 'papaparse'
import { useState } from 'react'

export default function AdminClientView({ submissions }: { submissions: any[] }) {
  const router = useRouter()
  const params = useSearchParams()
  const reference = params.get('reference') || ''
  const emailStatus = params.get('emailStatus') || ''

  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [isDeleting, setIsDeleting] = useState(false)

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const deleteSelected = async () => {
    if (selectedIds.length === 0) return
    setIsDeleting(true)
  
    try {
      const res = await fetch('/api/admin/submissions', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedIds }),
        credentials: 'include', // ✅ This sends cookies like admin-token
      })
      
  
      if (res.ok) {
        router.refresh()
      } else {
        const errorBody = await res.json()
        console.error('Delete failed:', res.status, errorBody) // 👈 Logs HTTP status and error message
      }
    } catch (err) {
      console.error('Error deleting submissions:', err)
    } finally {
      setIsDeleting(false)
    }
  }
  

  const downloadCSV = () => {
    const csvData = submissions.map((submission) => ({
      ID: submission.id,
      Name: submission.name,
      Reference: submission.reference,
      Username: submission.username,
      Email: submission.email,
      Phone: submission.phone,
      Package: submission.package,
      Created: new Date(submission.createdAt).toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
      EmailStatus:
        submission.emailStatus === 'sent'
          ? '✅ Sent'
          : submission.emailStatus === 'failed'
          ? '❌ Failed'
          : '⏳ Pending',
    }))

    const csv = Papa.unparse(csvData)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    saveAs(blob, 'submissions.csv')
  }

  return (
    <div className="p-6 space-y-8">
      <section>
        <h2 className="text-2xl font-semibold mb-4">📥 Form Submissions</h2>

        <form className="mb-4 flex flex-wrap gap-4" method="get">
          <div>
            <label className="block text-sm font-medium">Reference</label>
            <input
              type="text"
              name="reference"
              defaultValue={reference}
              className="border p-2 rounded w-48"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email Status</label>
            <select
              name="emailStatus"
              defaultValue={emailStatus}
              className="border p-2 rounded w-48"
            >
              <option value="">All</option>
              <option value="sent">Sent</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          <div className="flex items-end gap-4 flex-wrap">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Apply Filters
            </button>
            <button
              type="button"
              onClick={() => router.push('/admin')}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Reset Filters
            </button>
            <button
              type="button"
              onClick={downloadCSV}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Download CSV
            </button>
            <button
              type="button"
              disabled={selectedIds.length === 0 || isDeleting}
              onClick={deleteSelected}
              className="bg-gray-800 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {isDeleting ? 'Deleting...' : `Delete (${selectedIds.length})`}
            </button>
          </div>
        </form>

        <div className="overflow-x-auto overflow-y-auto max-h-[70vh] shadow-md rounded-lg border border-gray-200 bg-white mt-4">
          <table className="min-w-full table-auto text-black">
            <thead className="bg-green-800 text-white sticky top-0">
              <tr>
                <th className="px-4 py-3">
                  <span>Select</span>
                </th>
                <th className="px-6 py-4 text-left">ID</th>
                <th className="px-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-left">Reference</th>
                <th className="px-6 py-4 text-left">Username</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-left">Phone</th>
                <th className="px-6 py-4 text-left">Package</th>
                <th className="px-6 py-4 text-left">Created</th>
                <th className="px-4 py-2">Email Status</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => (
                <tr key={submission.id} className="hover:bg-gray-100">
                  <td className="px-4 py-3 text-center">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(submission.id)}
                      onChange={() => toggleSelection(submission.id)}
                    />
                  </td>
                  <td className="px-6 py-4">{submission.id}</td>
                  <td className="px-6 py-4">{submission.name}</td>
                  <td className="px-6 py-4">{submission.reference}</td>
                  <td className="px-6 py-4">{submission.username}</td>
                  <td className="px-6 py-4">{submission.email}</td>
                  <td className="px-6 py-4">{submission.phone}</td>
                  <td className="px-6 py-4">{submission.package}</td>
                  <td className="px-6 py-4">
                    {new Date(submission.createdAt).toLocaleString(undefined, {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </td>
                  <td className="text-sm">
                    {submission.emailStatus === 'sent'
                      ? '✅ Sent'
                      : submission.emailStatus === 'failed'
                      ? '❌ Failed'
                      : '⏳ Pending'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
