"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    console.log("🚀 Starting login process...")

    try {
      console.log("📤 Sending login request with:", { email })

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      console.log("📥 Response status:", res.status)

      const data = await res.json().catch(() => ({}))
      console.log("📥 Response data:", data)

      if (res.ok && data.token) {
        console.log("✅ Login successful, token received")
        console.log("📥 Response headers:", res.headers)
        
        // Store token in localStorage as backup
        localStorage.setItem("authToken", data.token)
        localStorage.setItem("user", JSON.stringify(data.user))
        console.log("✅ Token stored in localStorage")

        setSuccess("✅ Login successful! Redirecting...")
        
        console.log("🔄 Redirecting to /admin...")
        
        // Simple redirect
        window.location.href = "/admin"
        
      } else {
        const errorMsg = data.message || `Error ${res.status}`
        console.error("❌ Login failed:", errorMsg)
        setError(errorMsg)
      }
    } catch (err: any) {
      console.error("❌ Network/Fetch error:", err)
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Admin Login</h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded p-2 focus:outline-none focus:border-purple-500"
            placeholder="Enter email"
            required
            disabled={loading}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded p-2 focus:outline-none focus:border-purple-500"
            placeholder="Enter password"
            required
            disabled={loading}
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-[var(--amwik-purple)] hover:bg-purple-700 text-white font-semibold"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account? <a href="/admin/signup" className="text-purple-600 hover:underline">Sign up here</a>
        </p>
      </form>
    </div>
  )
}