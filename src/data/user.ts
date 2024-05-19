import {db} from "@/lib/db"

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    })

    return user
  } catch (error) {
    console.log(error)

    return null
  }
}

export const getUserById = async (id?: string) => {
  if (!id) return null
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
      include: {
        accounts: true,
      },
    })

    return user
  } catch (error) {
    console.log(error)

    return null
  }
}
