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
    <div className="max-w-sm mx-auto mt-20 p-6">
      {/* <h1 className="text-2xl font-bold mb-6">Add a book</h1> */}
      <h1 className="bt-auth-title">Füge ein Buch hinzu</h1>
      <p className="bt-auth-subtitle">Teile ein Buch aus deinem Bücherregal mit deinen Freund:innen.</p>
      <form action={addBook} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          placeholder="Titel"
          className="bt-input"
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Autor"
          className="bt-input"
          required
        />
        <input
          type="text"
          name="isbn"
          placeholder="ISBN"
          className="bt-input"
        />
        <input
          type="text"
          name="language"
          placeholder="Sprache"
          className="bt-input"
        />
        <input
          type="number"
          name="year"
          placeholder="Veröffentlichungsjahr"
          className="bt-input"
        />
        <input
          type="text"
          name="edition"
          placeholder="Ausgabe"
          className="bt-input"
        />
        <textarea
          name="description"
          placeholder="Klappentext / Kurzzusammenfassung"
          
          className="bt-input"
          rows={4}
        />
        <input
          type="url"
          name="coverImage"
          placeholder="Bild vom Buchdeckel"
          className="bt-input"
        />
        <button
          type="submit"
          className="bt-btn bt-btn-primary" style={{width: "100%", marginTop: "0.25rem"}}
        >
          Hinzufügen
        </button>
      </form>
    </div>
  )
}