import {faker} from "@faker-js/faker"
import {type User} from "@prisma/client"

import {db} from "../src/lib/db"

export const createManyComments = async (users: User[], complaintId: number): Promise<void> => {
  // Comentarios
  const randomComments = faker.number.int({min: 0, max: 20})

  for (let i = 0; i < randomComments; i++) {
    const anonymousComment = faker.datatype.boolean()
    const userCommentId = users[Math.floor(Math.random() * users.length)].id

    if (anonymousComment && complaintId) {
      await db.comment.create({
        data: {
          text: faker.lorem.paragraphs(3),
          anonymous: anonymousComment,
          complaintId,
          likes: faker.number.int({min: 0, max: 55}),
        },
      })
    }

    if (!anonymousComment && complaintId) {
      await db.comment.create({
        data: {
          text: faker.lorem.paragraphs(3),
          authorId: userCommentId,
          complaintId,
          likes: faker.number.int({min: 0, max: 55}),
        },
      })
    }

    console.log(`Comentario ${i.toString()}/${randomComments.toString()}`)
    console.log("*-------------------------------------------*")
  }
}
