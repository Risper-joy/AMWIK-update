// File: app/test-cookie/page.tsx

"use client"

import { useState } from "react"

export default function TestCookiePage() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testCookies = async () => {
    setLoading(true)
    try {
      console.log("🧪 Step 1: Setting test cookie...")

      // Call GET to set cookie
      const res1 = await fetch("/api/test-cookie")
      console.log("✅ Step 1 response:", res1.status)

      // Wait for cookie to be set
      await new Promise(r => setTimeout(r, 1000))

      console.log("🧪 Step 2: Checking if cookies exist...")

      // Call POST to check cookies
      const res2 = await fetch("/api/test-cookie", { method: "POST" })
      const data = await res2.json()

      console.log("✅ Step 2 response:", data)
      setResult(data)
    } catch (error) {
      console.error("❌ Error:", error)
      setResult({ error: String(error) })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: "40px", fontFamily: "monospace", maxWidth: "600px" }}>
      <h1>🧪 Cookie Test Page</h1>

      <button
        onClick={testCookies}
        disabled={loading}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "#8B5CF6",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        {loading ? "Testing..." : "Test Cookies"}
      </button>

      {result && (
        <div
          style={{
            backgroundColor: "#f0f0f0",
            padding: "15px",
            borderRadius: "5px",
            marginTop: "20px",
            border: "1px solid #ccc",
          }}
        >
          <h3>Results:</h3>
          <p>
            <strong>Test Cookie Found:</strong>{" "}
            {result.testCookieFound ? "✅ YES" : "❌ NO"}
          </p>
          <p>
            <strong>Auth Token Found:</strong>{" "}
            {result.authTokenFound ? "✅ YES" : "❌ NO"}
          </p>

          <h3 style={{ marginTop: "15px" }}>Full Response:</h3>
          <pre
            style={{
              backgroundColor: "white",
              padding: "10px",
              border: "1px solid #ddd",
              overflowX: "auto",
            }}
          >
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}

      <p style={{ marginTop: "20px", color: "#666", fontSize: "12px" }}>
        Check your browser console (F12) for detailed logs
      </p>
    </div>
  )
}