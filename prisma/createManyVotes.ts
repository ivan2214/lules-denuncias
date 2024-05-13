import {type User} from "@prisma/client"
import {faker} from "@faker-js/faker"

import {db} from "../src/lib/db"

export const createManyVotes = async (users: User[], complaintId: number): Promise<void> => {
  // Votos
  const randomVotes = faker.number.int({min: 0, max: 55}) // Número aleatorio de votos
  const userIds = users.map((user) => user.id) // Array de todos los IDs de usuarios
  const usersWithVotes = new Set() // Conjunto para almacenar IDs de usuarios que ya han votado

  for (let i = 0; i < randomVotes; i++) {
    // Escoger un ID de usuario aleatorio
    const userId = userIds[Math.floor(Math.random() * userIds.length)]

    // Verificar si este usuario ya ha votado
    if (!usersWithVotes.has(userId) && complaintId) {
      // Agregar el usuario al conjunto de usuarios que han votado
      usersWithVotes.add(userId)

      // Crear el voto
      await db.vote.create({
        data: {
          userId: userId,
          complaintId,
        },
      })
    }

    console.log(`Voto ${i.toString()}/${randomVotes.toString()}`)
    console.log("*-------------------------------------------*")
  }
  // Contar los votos recibidos por la queja
  const votesCount = await db.vote.count({
    where: {
      complaintId,
    },
  })

  // Actualizar la prioridad de la queja en función de los votos recibidos
  await db.complaint.update({
    where: {
      id: complaintId,
    },
    data: {
      priority: votesCount,
    },
  })
}
