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

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (res.ok && data.token) {
        localStorage.setItem("authToken", data.token)
        localStorage.setItem("user", JSON.stringify(data.user))
        setSuccess("Login successful! Redirecting...")
        setTimeout(() => {
          router.push("/admin")
        }, 1000)
      } else {
        setError(data.message || "Invalid login credentials")
      }
    } catch (err) {
      console.error(err)
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/auth/logout", { method: "POST" })

      if (res.ok) {
        localStorage.removeItem("authToken")
        localStorage.removeItem("user")
        setSuccess("Logged out successfully!")
        setTimeout(() => {
          router.push("/admin/login")
        }, 1000)
      } else {
        setError("Logout failed. Please try again.")
      }
    } catch (err) {
      console.error("Logout error:", err)
      setError("Network error during logout.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Admin Login</h2>

        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-3">{success}</p>}

        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Enter email"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Enter password"
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold"
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