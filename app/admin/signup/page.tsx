"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function AdminSignup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "memberOfficer" })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    // Basic validation
    if (form.name.length < 2) {
      setError("Name must be at least 2 characters")
      return
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (res.ok) {
        setSuccess("Account created successfully! Redirecting to login...")
        setForm({ name: "", email: "", password: "", role: "memberOfficer" })
        
        // Redirect to login after 2 seconds
        setTimeout(() => {
          router.push("/admin/login")
        }, 2000)
      } else {
        setError(data.message || "Signup failed. Please try again.")
      }
    } catch (err: any) {
      console.error("Signup error:", err)
      setError("Network error. Please try again.")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Signup</h1>

        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:border-purple-500"
        />
        
        <input
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:border-purple-500"
        />
        
        <input
          type="password"
          placeholder="Password (min 6 characters)"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:border-purple-500"
        />

        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:border-purple-500"
        >
          <option value="memberOfficer">Member Officer</option>
          <option value="admin">Admin</option>
        </select>

        {error && <p className="text-red-500 text-sm mb-4 p-2 bg-red-50 rounded">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-4 p-2 bg-green-50 rounded">{success}</p>}

        <Button 
          type="submit" 
          className="w-full bg-[var(--amwik-purple)] hover:bg-purple-700 text-white font-semibold"
          disabled={false}
        >
          Create Account
        </Button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account? <a href="/admin/login" className="text-purple-600 hover:underline">Login here</a>
        </p>
      </form>
    </div>
  )
}