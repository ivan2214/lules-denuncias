"use server";
import {revalidatePath} from "next/cache";

import {db} from "@/lib/db";
import {UpdateComplainSchema} from "@/schemas";
import {type UpdateComplaimentFormValues} from "@/components/complaint/complaint-form";

export const updateComplaint = async (values: UpdateComplaimentFormValues, complaintId: number) => {
  // Validar los campos de entrada
  const validatedFields = UpdateComplainSchema.safeParse(values);

  // Verificar si la validación es exitosa
  if (!validatedFields.success) {
    return {error: "Invalid fields!"};
  }

  // Verificar si se proporcionó el ID de la queja
  if (!complaintId) return {error: "Required fields!"};

  // Extraer los campos validados
  const {description, latitude, longitude, title, address, categoriesNames, city, country, images} =
    validatedFields.data;

  try {
    //verificar la localizacion ya existe sino crearla

    const locationId = await db.location.findFirst({
      where: {
        AND: {
          city,
          country,
          address,
          latitude,
          longitude,
        },
      },
    });

    let locationCreate;

    if (!locationId && latitude && longitude) {
      locationCreate = await db.location.create({
        data: {
          city,
          country,
          address,
          latitude,
          longitude,
        },
      });
    }

    // Actualizar la queja en la base de datos
    await db.complaint.update({
      where: {
        id: complaintId,
      },
      data: {
        description,
        title,
        categories: {
          upsert: categoriesNames?.map((category) => ({
            where: {
              name: category.name,
            },
            create: {
              name: category.name,
            },
            update: {
              name: category.name,
            },
          })),
        },
        images: {
          upsert: images?.map((image) => ({
            where: {
              url: image.url,
            },
            create: {
              url: image.url,
            },
            update: {
              url: image.url,
            },
          })),
        },
        locationId: locationId ? locationId.id : locationCreate?.id,
      },
    });

    // Devolver un mensaje de éxito
    return {success: "Complaint updated successfully!"};
  } catch (error) {
    // Capturar cualquier error y devolver un mensaje de error
    console.log(error);

    console.error("Error updating complaint:", error);

    return {error: "An error occurred while updating the complaint."};
  } finally {
    revalidatePath("/complaint/[complaintId]");
  }
};
