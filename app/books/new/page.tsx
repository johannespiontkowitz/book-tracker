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
      <h1 className="text-2xl font-bold mb-6">Add a book</h1>
      <form action={addBook} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="border rounded px-3 py-2"
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          className="border rounded px-3 py-2"
          required
        />
        <button
          type="submit"
          className="bg-black text-white rounded px-3 py-2"
        >
          Add book
        </button>
      </form>
    </div>
  )
}