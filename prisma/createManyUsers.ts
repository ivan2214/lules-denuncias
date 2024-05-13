import {type User} from "@prisma/client"
import {faker} from "@faker-js/faker"
import bcrypt from "bcryptjs"

import {db} from "../src/lib/db"

export const createManyUsers = async (): Promise<User[]> => {
  const randomUsers = faker.number.int({min: 5, max: 10})

  for (let i = 0; i < randomUsers; i++) {
    const password = "123"
    const hashPassword = await bcrypt.hash(password, 10)

    await db.user.create({
      data: {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        hashPassword,
        image: faker.image.avatar(),
        reputation: faker.number.int({min: 0, max: 100}),
      },
    })
    console.log(`👤 Generando usuarios ${i.toString()}/${randomUsers.toString()}`)
    console.log("*-------------------------------------------*")
  }

  const users = await db.user.findMany()

  return users
}
