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
    return {error: "Algo salio mal!"};
  }

  // Verificar si se proporcionó el ID de la queja
  if (!complaintId) return {error: "Algo salio mal!"};

  // Extraer los campos validados
  const {description, title, address, categoriesNames, images} = validatedFields.data;

  if (!title || !description) return {error: "Los campos title y description son requeridos!"};

  try {
    //verificar la localizacion ya existe sino crearla

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
        address,
      },
    });

    // Devolver un mensaje de éxito
    return {success: "Queja actualizada correctamente!"};
  } catch (error) {
    return {error: "Se produjo un error al actualizar la queja"};
  } finally {
    revalidatePath("/complaint/[complaintId]");
  }
};
