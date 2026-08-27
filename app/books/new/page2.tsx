import { auth } from "@/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { addBook } from "./actions"

export default async function NewBookPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="bt-auth-card">
      <h1 className="bt-auth-title">Füge ein Buch hinzu</h1>
      <p className="bt-auth-subtitle">Teile ein Buch aus deinem Bücherregal mit deinen Freund:innen.</p>
      <form action={addBook} className="bt-form">
        <div className="bt-form-group">
          <label className="bt-label" htmlFor="title">Buchtitel*</label>
          <input id="title" type="text" name="title" placeholder="z.B. Per Anhalter durch die Galaxis" className="bt-input" required />
        </div>
        <div className="bt-form-group">
          <label className="bt-label" htmlFor="author">Autor*</label>
          <input id="author" type="text" name="author" placeholder="z.B. Douglas Adams" className="bt-input" required />
        </div>
        <div className="bt-form-group">
          <label className="bt-label" htmlFor="isbn">ISBN</label>
          <input id="isbn" type="text" name="isbn" placeholder="z.B. 3-453-50016-4" className="bt-input" />
        </div>
        <button type="submit" className="bt-btn bt-btn-primary" style={{width: "100%", marginTop: "0.25rem"}}>Hinzufügen</button>
      </form>
    </div>
  )
}