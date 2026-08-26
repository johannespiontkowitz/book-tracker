import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function HomePage() {
  const books = await prisma.book.findMany({
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

      {books.length === 0 ? (
        <div className="bt-empty-state">Bisher gibt es keine Bücher! Füge das erste hinzu!</div>
      ) : (
        <ul className="bt-book-list">
          {books.map((book) => (
            <li key={book.id} className="bt-book-card">
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