"use client"

import { useSession, signOut } from "@/lib/auth-client"
import Link from "next/link"

export default function Nav() {
  const { data: session, isPending } = useSession()

  return (
    <nav className="bt-nav">
      <Link href="/" className="bt-nav-brand">Stattbibliothek</Link>
      <div className="bt-nav-actions">
        {isPending ? null : session ? (
          <>
            <Link href="/my-books" className="bt-nav-link">Meine Bücher</Link>
            <Link href="/books/all" className="bt-nav-link">Stöbern</Link>
            <span className="bt-nav-user">{session.user.name}</span>
            <button onClick={() => signOut()} className="bt-btn bt-btn-ghost">Abmelden</button>
          </>
        ) : (
          <>
            <Link href="/login" className="bt-nav-link">Login</Link>
            <Link href="/signup" className="bt-btn bt-btn-primary">Registrieren</Link>
          </>
        )}
      </div>
    </nav>
  )
}