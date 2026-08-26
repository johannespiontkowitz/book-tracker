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
      <h1 className="bt-auth-title">Add a book</h1>
      <p className="bt-auth-subtitle">Share a book from your shelf with your friends.</p>
      <form action={addBook} className="bt-form">
        <div className="bt-form-group">
          <label className="bt-label" htmlFor="title">Title</label>
          <input id="title" type="text" name="title" placeholder="e.g. The Hitchhiker's Guide" className="bt-input" required />
        </div>
        <div className="bt-form-group">
          <label className="bt-label" htmlFor="author">Author</label>
          <input id="author" type="text" name="author" placeholder="e.g. Douglas Adams" className="bt-input" required />
        </div>
        <button type="submit" className="bt-btn bt-btn-primary" style={{width: "100%", marginTop: "0.25rem"}}>Add book</button>
      </form>
    </div>
  )
}