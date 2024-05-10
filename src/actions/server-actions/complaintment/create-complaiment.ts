"use server";

import {StatusComplaint} from "@prisma/client";

import {db} from "@/lib/db";
import {CreateComplainSchema} from "@/schemas";
import {type CreateComplaimentFormValues} from "@/components/complaint/complaint-form";

export const createComplaint = async (values: CreateComplaimentFormValues) => {
  const validatedFields = CreateComplainSchema.safeParse(values);

  if (!validatedFields.success) {
    return {error: "Invalid fields!"};
  }

  const {description, title, address, categoriesNames, images, userId} = validatedFields.data;

  if (!description || !title || !address || !categoriesNames || !images) {
    return {error: "Invalid fields!"};
  }

  if (userId && userId > 0 && userId !== undefined && userId !== null) {
    await db.complaint.create({
      data: {
        title,
        description,
        categories: {
          connectOrCreate: categoriesNames.map((category) => ({
            where: {name: category.name},
            create: {name: category.name},
          })),
        },
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
    });
  }

  if (!userId || userId === 0 || userId === undefined || userId === null || userId < 0) {
    await db.complaint.create({
      data: {
        title,
        description,
        categories: {
          connectOrCreate: categoriesNames.map((category) => ({
            where: {name: category.name},
            create: {name: category.name},
          })),
        },
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
    });
  }

  return {success: "Complaint created successfully!"};
};
