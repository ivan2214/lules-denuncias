"use server"

import {StatusComplaint, type Complaint} from "@prisma/client"

import {db} from "@/lib/db"
import {CreateComplainSchema} from "@/schemas"
import {type CreateComplaimentFormValues} from "@/components/complaint/complaint-form"
import {auth} from "auth"

export const createComplaint = async (values: CreateComplaimentFormValues) => {
  const session = await auth()
  const userId = session?.user?.id
  const validatedFields = CreateComplainSchema.safeParse(values)

  if (!validatedFields.success) {
    return {error: "Invalid fields!"}
  }

  const {description, title, address, categoriesNames, images} = validatedFields.data

  if (!description || !title || !address || !categoriesNames || !images) {
    return {error: "Invalid fields!"}
  }

  let complaint = {}

  if (userId && userId !== undefined && userId !== null) {
    complaint = await db.complaint.create({
      data: {
        title,
        description,
        images: {
          connectOrCreate: images.map((imageUrl) => ({
            where: {url: imageUrl.url},
            create: {url: imageUrl.url},
          })),
        },
        userId,
        anonymous: false,
        status: StatusComplaint.PENDING,
        address,
      },
    })
  }

  if (!userId || userId === undefined || userId === null) {
    complaint = await db.complaint.create({
      data: {
        title,
        description,
        images: {
          connectOrCreate: images.map((imageUrl) => ({
            where: {url: imageUrl.url},
            create: {url: imageUrl.url},
          })),
        },
        anonymous: true,
        status: StatusComplaint.PENDING,
        address,
      },
    })
  }

  const isAlreadyCreatedCategoryOnComplaint = await db.categoriesOnComplaint.findMany({
    where: {
      Category: {
        name: {
          in: categoriesNames.map((category) => category.name),
        },
      },
    },
  })

  const isAlreadyCreatedCategory = await db.category.findMany({
    where: {
      name: {
        in: categoriesNames.map((category) => category.name),
      },
    },
  })

  if (!isAlreadyCreatedCategoryOnComplaint.length && !isAlreadyCreatedCategory.length) {
    await db.category.createMany({
      data: categoriesNames.map((category) => ({
        name: category.name,
      })),
    })
  }

  const categories = await db.category.findMany({
    where: {
      name: {
        in: categoriesNames.map((category) => category.name),
      },
    },
  })

  await db.categoriesOnComplaint.createMany({
    data: categories.map((category) => ({
      complaintId: (complaint as Complaint).id,
      categoryId: category.id,
    })),
  })

  return {success: "Complaint created successfully!"}
}
