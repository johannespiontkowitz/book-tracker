"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export async function addBook(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect("/login")
  }

  const title = formData.get("title") as string
  const author = formData.get("author") as string

  if (!title || !author) {
    throw new Error("Title and author are required")
  }

  await prisma.book.create({
    data: {
      title,
      author,
      ownerId: session.user.id,
    },
  })

  redirect("/")
}