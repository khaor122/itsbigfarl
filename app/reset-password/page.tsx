// app/reset-password/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

const ResetPasswordPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token') // Extract the token from the URL

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  // If no token, redirect to login page
  useEffect(() => {
    if (!token) {
      router.push('/login')
    }
  }, [token, router])

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()

    // Ensure the passwords match
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    const res = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, newPassword }),
    })

    if (res.ok) {
      setMessage('Password reset successfully. You can now log in.')
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } else {
      const data = await res.json()
      setError(data.message || 'Failed to reset password')
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleResetPassword} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Reset Password</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {message && <p className="text-green-500 text-sm mb-4">{message}</p>}

        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
          required
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm New Password"
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Reset Password
        </button>
      </form>
    </main>
  )
}

export default ResetPasswordPage
