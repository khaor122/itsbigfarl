// app/login/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showResetEmailForm, setShowResetEmailForm] = useState(false)
  const [resetEmail, setResetEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include', // 👈 crucial!
    })
    console.log('resss', res);
    if (res.ok) {
      setTimeout(() => {
        router.push('/admin');
      }, 500); 
    } else {
      const data = await res.json()
      setError(data.message || 'Login failed')
    }
  }

  const handleResetPasswordRequest = async () => {
    const response = await fetch('/api/auth/reset-request', {
      method: 'POST',
      body: JSON.stringify({ email: resetEmail }),
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await response.json();
    setMessage(result.message);
    setResetEmail(''); // Clear the input after submission
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Login
        </button>

        {/* Forgot Password Link */}
        <div className="text-center mt-4">
          <a
            className="text-blue-500 text-sm cursor-pointer"
            onClick={() => setShowResetEmailForm(true)}
          >
            Forgot Password?
          </a>
        </div>

        {/* Reset Password Email Form */}
        {showResetEmailForm && (
          <div className="mt-4">
            <input
              type="email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
            />
            <button
              type="button"
              onClick={handleResetPasswordRequest}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
            >
              Send Reset Link
            </button>
            {message && <p className="text-green-500 text-center mt-2">{message}</p>}
          </div>
        )}
      </form>
    </main>
  )
}
