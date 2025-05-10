// app/admin/layout.tsx

"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = () => {
    // 🔐 Clear JWT token (localStorage or cookies)
    localStorage.removeItem("token") // Or the key you use to store JWT

    // Optional: also clear user info if stored
    localStorage.removeItem("user")

    // 🔁 Redirect to login page
    router.push("/login")
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-green-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Its Big Farl</h2>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link href="/admin" className="text-white hover:bg-green-700 p-2 rounded block">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/admin/submissions" className="text-white hover:bg-green-700 p-2 rounded block">
                Submissions
              </Link>
            </li>
            <li>
              <Link href="/admin/orders" className="text-white hover:bg-green-700 p-2 rounded block">
                Orders
              </Link>
            </li>
            {/* Add more navigation links here */}
          </ul>
        </nav>
        <button
          onClick={handleLogout}
          className="bg-white text-green-800 px-4 py-2 rounded hover:bg-gray-200 transition mt-6"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <header className="bg-green-800 text-white p-4 shadow mb-6">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">Admin Panel</h1>
          </div>
        </header>

        <main>{children}</main>
      </div>
    </div>
  )
}
