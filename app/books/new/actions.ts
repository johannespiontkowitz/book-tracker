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

  const isbn = (formData.get("isbn") as string) || null
  const language = (formData.get("language") as string) || null
  const yearRaw = formData.get("year") as string
  const year = yearRaw ? parseInt(yearRaw, 10) : null
  const edition = (formData.get("edition") as string) || null
  const description = (formData.get("description") as string) || null
  const coverImage = (formData.get("coverImage") as string) || null

  await prisma.book.create({
    data: {
      title,
      author,
      isbn,
      language,
      year,
      edition,
      description,
      coverImage,
      ownerId: session.user.id,
    },
  })

  redirect("/")
}