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

  const {description, latitude, longitude, title, address, categoriesNames, city, country, images} =
    validatedFields.data;

  if (
    !description ||
    !latitude ||
    !longitude ||
    !title ||
    !address ||
    !categoriesNames ||
    !city ||
    !country ||
    !images
  ) {
    return {error: "Invalid fields!"};
  }

  let locationCreate;

  const locationId = await db.location
    .findFirst({
      where: {
        latitude,
        longitude,
        address,
        city,
        country,
      },
    })
    .then((location) => location?.id);

  if (!locationId) {
    locationCreate = await db.location.create({
      data: {
        latitude,
        longitude,
        address,
        city,
        country,
      },
    });
  }

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
      userId: 1,
      status: StatusComplaint.PENDING,
      locationId: locationId ?? locationCreate?.id,
    },
  });

  return {success: "Complaint created successfully!"};
};
