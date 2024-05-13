import {PrismaClient} from "@prisma/client"

import {createManyComplaints} from "./createManyComplaints"
import {createManyUsers} from "./createManyUsers"
import {createManyCategories} from "./createManyCategories"
import {createManyComments} from "./createManyComments"
import {createManyVotes} from "./createManyVotes"

const prismaDb = new PrismaClient()

async function main() {
  // limpia la base de datos
  await prismaDb.$transaction([
    prismaDb.comment.deleteMany({}),
    prismaDb.complaint.deleteMany({}),
    prismaDb.user.deleteMany({}),
    prismaDb.category.deleteMany({}),
    prismaDb.vote.deleteMany({}),
    prismaDb.image.deleteMany({}),
    prismaDb.categoriesOnComplaint.deleteMany({}),
  ])

  // Crear usuarios
  const users = await createManyUsers()

  const categories = await createManyCategories()

  const complaintIds: number[] = await createManyComplaints(users, categories)

  for (const complaintId of complaintIds) {
    await createManyComments(users, complaintId)
    await createManyVotes(users, complaintId)
  }
}

main()
  .then(async () => {
    await prismaDb.$disconnect()
  })
  .catch(async (e: unknown) => {
    console.error(e)
    await prismaDb.$disconnect()
    process.exit(1)
  })
