import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  const books = await prisma.book.findMany({
    where: q
      ? {
          OR: [
            { title: { contains: q, mode: "insensitive" } },
            { author: { contains: q, mode: "insensitive" } },
            { isbn: { contains: q, mode: "insensitive" } },
          ],
        }
      : undefined,
    include: {
      owner: {
        select: { name: true },
      },
    },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="bt-page">
      <div className="bt-page-header">
        <h1 className="bt-heading">Alle Bücher</h1>
        <Link href="/books/new" className="bt-btn bt-btn-primary">+ Buch anbieten</Link>
      </div>

      <form method="GET" className="mb-4">
        <input
          type="search"
          name="q"
          defaultValue={q ?? ""}
          placeholder="Nach Titel, Autor oder ISBN suchen..."
          className="bt-input"
        />
        <button type="submit" className="bt-btn bt-btn-primary ml-2">Suchen</button>
      </form>

      {books.length === 0 ? (
        <div className="bt-empty-state">Bisher gibt es keine Bücher! Füge das erste hinzu!</div>
      ) : (
        <ul className="bt-book-list">
          {books.map((book) => (
            <li key={book.id} className="bt-book-card">
              {book.coverImage && (
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-16 h-24 object-cover rounded"
                />
              )}
              <div>
                <p className="bt-book-title">{book.title}</p>
                <p className="bt-book-author">von {book.author}</p>
                <p className="bt-book-owner">Gehört {book.owner.name}</p>
              </div>
              <span className={`bt-badge ${book.status === "AVAILABLE" ? "bt-badge-available" : "bt-badge-borrowed"}`}>
                {book.status === "AVAILABLE" ? "Verfügbar" : "Ausgeliehen"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}