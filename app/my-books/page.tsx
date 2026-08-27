import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export default async function MyBooksPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect("/login")
  }

  const userId = session.user.id

  // Books I own, with their most relevant active/requested loan (if any)
  const ownedBooks = await prisma.book.findMany({
    where: { ownerId: userId },
    include: {
      loans: {
        where: { status: { in: ["REQUESTED", "ACTIVE", "OVERDUE"] } },
        include: { borrower: { select: { name: true, email: true } } },
        orderBy: { requestedAt: "desc" },
        take: 1,
      },
    },
    orderBy: { createdAt: "desc" },
  })

  // Books I've borrowed that I haven't returned yet
  const borrowedLoans = await prisma.loan.findMany({
    where: {
      borrowerId: userId,
      status: { in: ["REQUESTED", "ACTIVE", "OVERDUE"] },
    },
    include: {
      book: {
        include: { owner: { select: { name: true, email: true } } },
      },
    },
    orderBy: { requestedAt: "desc" },
  })

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 flex flex-col gap-10">
      <section>
        <h1 className="text-2xl font-bold mb-4">My books</h1>
        {ownedBooks.length === 0 ? (
          <p className="text-gray-500">You haven't added any books yet.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {ownedBooks.map((book) => {
              const activeLoan = book.loans[0]
              return (
                <li
                  key={book.id}
                  className="border rounded p-4 flex justify-between items-start"
                >
                  <div>
                    <p className="font-semibold">{book.title}</p>
                    <p className="text-sm text-gray-600">by {book.author}</p>
                    {activeLoan ? (
                      <p className="text-sm text-gray-700 mt-1">
                        With <strong>{activeLoan.borrower.name}</strong> since{" "}
                        {new Date(
                          activeLoan.approvedAt ?? activeLoan.requestedAt
                        ).toLocaleDateString()}
                        {activeLoan.status === "REQUESTED" && " (pending approval)"}
                      </p>
                    ) : (
                      <p className="text-sm text-green-700 mt-1">Available</p>
                    )}
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded whitespace-nowrap ${
                      book.status === "AVAILABLE"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {book.status}
                  </span>
                </li>
              )
            })}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Borrowed from others</h2>
        {borrowedLoans.length === 0 ? (
          <p className="text-gray-500">
            You don't currently have any borrowed books.
          </p>
        ) : (
          <ul className="flex flex-col gap-3">
            {borrowedLoans.map((loan) => (
              <li key={loan.id} className="border rounded p-4">
                <p className="font-semibold">{loan.book.title}</p>
                <p className="text-sm text-gray-600">by {loan.book.author}</p>
                <p className="text-sm text-gray-700 mt-1">
                  Borrowed from <strong>{loan.book.owner.name}</strong> on{" "}
                  {new Date(
                    loan.approvedAt ?? loan.requestedAt
                  ).toLocaleDateString()}
                  {loan.status === "REQUESTED" && " (awaiting approval)"}
                </p>
                {loan.dueDate && (
                  <p className="text-sm text-gray-500">
                    Due {new Date(loan.dueDate).toLocaleDateString()}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}