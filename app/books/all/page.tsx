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
    <div className="max-w-2xl mx-auto mt-10 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All books</h1>
        <Link
          href="/books/new"
          className="bg-black text-white rounded px-3 py-2"
        >
          Add book
        </Link>
      </div>

      {books.length === 0 ? (
        <p className="text-gray-500">No books yet. Add the first one!</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {books.map((book) => (
            <li
              key={book.id}
              className="border rounded p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{book.title}</p>
                <p className="text-sm text-gray-600">by {book.author}</p>
                <p className="text-sm text-gray-500">
                  Owned by {book.owner.name}
                </p>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded ${
                  book.status === "AVAILABLE"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {book.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}