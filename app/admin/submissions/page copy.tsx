// app/admin/submissions/page.tsx
import { getSubmissions } from "@/actions/submission-actions"
import { formatDistanceToNow } from "date-fns"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Submission } from '@prisma/client';




export default async function SubmissionsPage() {
  const { success, data: submissions, error } = await getSubmissions()

  if (!success) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Submissions</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Submissions</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableCaption>List of form submissions</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Referral Source</TableHead>
              <TableHead>Referrer</TableHead>
              <TableHead>Submitted</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No submissions yet
                </TableCell>
              </TableRow>
            ) : (
                submissions.map((submission: Submission) => (
                <TableRow key={submission.id}>
                  <TableCell>{submission.username}</TableCell>
                  <TableCell>{submission.email}</TableCell>
                  <TableCell>{submission.phone}</TableCell>
                  <TableCell>{submission.referralSource}</TableCell>
                  <TableCell>{submission.referrerUsername}</TableCell>
                  <TableCell>{formatDistanceToNow(new Date(submission.createdAt), { addSuffix: true })}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
