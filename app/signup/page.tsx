"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signUp } from "@/lib/auth-client"

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    const { error } = await signUp.email({
      name,
      email,
      password,
    })

    if (error) {
      setError(error.message ?? "Something went wrong")
      return
    }

    router.push("/")
  }

  return (
    <div className="bt-auth-card">
      <h1 className="bt-auth-title">Join book-tracker</h1>
      <p className="bt-auth-subtitle">Share your shelf and borrow from friends.</p>
      <form onSubmit={handleSubmit} className="bt-form">
        <div className="bt-form-group">
          <label className="bt-label" htmlFor="name">Name</label>
          <input id="name" type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} className="bt-input" required />
        </div>
        <div className="bt-form-group">
          <label className="bt-label" htmlFor="email">Email</label>
          <input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="bt-input" required />
        </div>
        <div className="bt-form-group">
          <label className="bt-label" htmlFor="password">Password</label>
          <input id="password" type="password" placeholder="At least 8 characters" value={password} onChange={(e) => setPassword(e.target.value)} className="bt-input" required minLength={8} />
        </div>
        {error && <p style={{fontSize: "0.85rem", color: "var(--bt-peach-dark)"}}>{error}</p>}
        <button type="submit" className="bt-btn bt-btn-primary" style={{width: "100%", marginTop: "0.25rem"}}>Create account</button>
      </form>
      <hr className="bt-divider" />
      <p style={{textAlign: "center", fontSize: "0.875rem", color: "var(--bt-text-soft)"}}>Already have an account? <a href="/login" className="bt-link">Log in</a></p>
    </div>
  )
}