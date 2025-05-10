// app/reset-password/page.tsx
import { Suspense } from 'react'
import ResetPasswordForm from './ResetPasswordForm'

export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <Suspense fallback={<div>Loading...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </main>
  )
}
