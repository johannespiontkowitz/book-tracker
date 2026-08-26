"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "@/lib/auth-client"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    const { error } = await signIn.email({
      email,
      password,
    })

    if (error) {
      setError(error.message ?? "Invalid email or password")
      return
    }

    router.push("/")
  }

  return (
    <div className="bt-auth-card">
      <h1 className="bt-auth-title">Welcome back 👋</h1>
      <p className="bt-auth-subtitle">Log in to see your friends' shelves.</p>
      <form onSubmit={handleSubmit} className="bt-form">
        <div className="bt-form-group">
          <label className="bt-label" htmlFor="email">Email</label>
          <input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="bt-input" required />
        </div>
        <div className="bt-form-group">
          <label className="bt-label" htmlFor="password">Password</label>
          <input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="bt-input" required />
        </div>
        {error && <p style={{fontSize: "0.85rem", color: "var(--bt-peach-dark)"}}>{error}</p>}
        <button type="submit" className="bt-btn bt-btn-primary" style={{width: "100%", marginTop: "0.25rem"}}>Log in</button>
      </form>
      <hr className="bt-divider" />
      <p style={{textAlign: "center", fontSize: "0.875rem", color: "var(--bt-text-soft)"}}>Don't have an account? <a href="/signup" className="bt-link">Sign up</a></p>
    </div>
  )
}