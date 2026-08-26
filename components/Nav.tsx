"use client"

import { useSession, signOut } from "@/lib/auth-client"
import Link from "next/link"

export default function Nav() {
  const { data: session, isPending } = useSession()

  return (
    <nav className="flex justify-between items-center p-4 border-b">
      <Link href="/" className="font-bold">book-tracker</Link>
      <div className="flex gap-4 items-center">
        {isPending ? null : session ? (
          <>
            <span>{session.user.name}</span>
            <button onClick={() => signOut()}>Log out</button>
          </>
        ) : (
          <>
            <Link href="/login">Log in</Link>
            <Link href="/signup">Sign up</Link>
          </>
        )}
      </div>
    </nav>
  )
}