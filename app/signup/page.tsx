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
      <h1 className="bt-auth-title">Stattbibliothek beitreten!</h1>
      <p className="bt-auth-subtitle">Teile dein Bücherregal und leihe von deinen Freund:innen.</p>
      <form onSubmit={handleSubmit} className="bt-form">
        <div className="bt-form-group">
          <label className="bt-label" htmlFor="name">Name</label>
          <input id="name" type="text" placeholder="Dein Name" value={name} onChange={(e) => setName(e.target.value)} className="bt-input" required />
        </div>
        <div className="bt-form-group">
          <label className="bt-label" htmlFor="email">E-Mail</label>
          <input id="email" type="email" placeholder="buecherwurm@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="bt-input" required />
        </div>
        <div className="bt-form-group">
          <label className="bt-label" htmlFor="password">Passwort</label>
          <input id="password" type="password" placeholder="Mindestens 8 Zeichen" value={password} onChange={(e) => setPassword(e.target.value)} className="bt-input" required minLength={8} />
        </div>
        {error && <p style={{fontSize: "0.85rem", color: "var(--bt-peach-dark)"}}>{error}</p>}
        <button type="submit" className="bt-btn bt-btn-primary" style={{width: "100%", marginTop: "0.25rem"}}>Stattbibliothek beitreten</button>
      </form>
      <hr className="bt-divider" />
      <p style={{textAlign: "center", fontSize: "0.875rem", color: "var(--bt-text-soft)"}}>Du hast schon einen Account? <a href="/login" className="bt-link">Anmelden</a></p>
    </div>
  )
}