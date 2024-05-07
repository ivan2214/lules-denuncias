"use server";

import {StatusComplaint} from "@prisma/client";

import {type CreateComplaimentFormValues} from "@/components/modals/create-complaiment-modal";
import {db} from "@/lib/db";
import {CreateComplainSchema} from "@/schemas";

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

  const [categoriesIsAlreadyCreated, imagesIsAlreadyCreated, locationIsAlreadyCreated] =
    await Promise.all([
      db.category.findMany({
        where: {
          name: {
            in: categoriesNames.map((category) => category.name),
          },
        },
      }),
      db.image.findMany({
        where: {
          url: {
            in: images.map((image) => image.url),
          },
        },
      }),
      db.location.findFirst({
        where: {
          address,
          city,
          country,
          latitude,
          longitude,
        },
      }),
    ]);

  const categoryIds = categoriesIsAlreadyCreated.map((category) => category.id);
  const imageUrls = imagesIsAlreadyCreated.map((image) => image.url);
  const locationId = locationIsAlreadyCreated?.id;

  let complaint;

  // Casos

  // 1. Categorías y ubicación existen, pero no hay imágenes
  if (categoryIds.length > 0 && locationId && !imageUrls.length) {
    complaint = await db.complaint.create({
      data: {
        title,
        description,
        categories: {
          connect: categoryIds.map((categoryId) => ({id: categoryId})),
        },
        images: {
          createMany: {
            data: images.map((image) => ({url: image.url})),
            skipDuplicates: true,
          },
        },
        userId: 1,
        status: StatusComplaint.PENDING,
        locationId: locationId ? locationId : undefined,
      },
    });
  }

  // 2. Imágenes y ubicación existen, pero no hay categorías
  if (imageUrls.length > 0 && locationId && !categoryIds.length) {
    complaint = await db.complaint.create({
      data: {
        title,
        description,
        images: {
          connect: imageUrls.map((imageUrl) => ({url: imageUrl})),
        },
        categories: {
          createMany: {
            data: categoriesNames.map((category) => ({name: category.name})),
            skipDuplicates: true,
          },
        },
        userId: 1,
        status: StatusComplaint.PENDING,
        locationId: locationId ? locationId : undefined,
      },
    });
  }

  // 3. Categorías e imágenes existen, pero no hay ubicación
  if (categoryIds.length > 0 && imageUrls.length > 0 && !locationId) {
    const location = await db.location.create({
      data: {
        address,
        city,
        country,
        latitude,
        longitude,
      },
    });

    complaint = await db.complaint.create({
      data: {
        title,
        description,
        categories: {
          connect: categoryIds.map((categoryId) => ({id: categoryId})),
        },
        images: {
          connect: imageUrls.map((imageUrl) => ({url: imageUrl})),
        },
        userId: 1,
        status: StatusComplaint.PENDING,
        locationId: location.id,
      },
    });
  }

  // 4. No hay categorías ni imágenes, pero la ubicación existe
  if (!categoryIds.length && !imageUrls.length && locationId) {
    complaint = await db.complaint.create({
      data: {
        title,
        description,
        userId: 1,
        status: StatusComplaint.PENDING,
        locationId: locationId ? locationId : undefined,
        categories: {
          createMany: {
            data: categoriesNames.map((category) => ({name: category.name})),
            skipDuplicates: true,
          },
        },
        images: {
          createMany: {
            data: images.map((image) => ({url: image.url})),
            skipDuplicates: true,
          },
        },
      },
    });
  }

  // 5. No hay categorías ni ubicación, pero existen imágenes
  if (!categoryIds.length && imageUrls.length > 0 && !locationId) {
    const location = await db.location.create({
      data: {
        address,
        city,
        country,
        latitude,
        longitude,
      },
    });

    complaint = await db.complaint.create({
      data: {
        title,
        description,
        categories: {
          createMany: {
            data: categoriesNames.map((category) => ({name: category.name})),
            skipDuplicates: true,
          },
        },
        images: {
          connect: imageUrls.map((imageUrl) => ({url: imageUrl})),
        },
        userId: 1,
        status: StatusComplaint.PENDING,
        locationId: location.id,
      },
    });
  }

  // 6. No hay imágenes ni ubicación, pero existen categorías
  if (categoryIds.length > 0 && !imageUrls.length && !locationId) {
    const location = await db.location.create({
      data: {
        address,
        city,
        country,
        latitude,
        longitude,
      },
    });

    complaint = await db.complaint.create({
      data: {
        title,
        description,
        categories: {
          connect: categoryIds.map((categoryId) => ({id: categoryId})),
        },
        images: {
          createMany: {
            data: images.map((image) => ({url: image.url})),
            skipDuplicates: true,
          },
        },
        userId: 1,
        status: StatusComplaint.PENDING,
        locationId: location.id,
      },
    });
  }

  // 7. No hay categorías, imágenes ni ubicación
  if (!categoryIds.length && !imageUrls.length && !locationId) {
    const location = await db.location.create({
      data: {
        address,
        city,
        country,
        latitude,
        longitude,
      },
    });

    complaint = await db.complaint.create({
      data: {
        title,
        description,
        userId: 1,
        status: StatusComplaint.PENDING,
        categories: {
          createMany: {
            data: categoriesNames.map((category) => ({name: category.name})),
            skipDuplicates: true,
          },
        },
        images: {
          createMany: {
            data: images.map((image) => ({url: image.url})),
            skipDuplicates: true,
          },
        },
        locationId: location.id,
      },
    });
  }

  return {success: "Complaint created successfully!"};
};
