"use server";
import {revalidatePath} from "next/cache";
import {StatusComplaint} from "@prisma/client";

import {db} from "@/lib/db";

export const voteAction = async (complaintId: number, userId?: string) => {
  if (!complaintId || !userId) return {error: "Parametros invalidos"};

  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  const complaint = await db.complaint.findUnique({
    where: {
      id: complaintId,
    },
  });

  if (!user) return {error: "Usuario no encontrado"};

  if (!complaint) return {error: "Queja no encontrada"};

  if (user.id === complaint.userId) return {error: "No puedes votar por ti mismo"};

  if (complaint.status === StatusComplaint.CLOSED) return {error: "La queja ya ha sido cerrada"};

  const vote = await db.vote.findFirst({
    where: {
      complaintId,
      userId,
    },
  });

  if (vote) return {error: "Ya has votado"};

  try {
    await db.vote.create({
      data: {
        complaintId,
        userId: user?.id,
      },
    });

    return {success: "Voto registrado"};
  } catch (error) {
    return {error: "Algo salio mal en el voto!"};
  } finally {
    revalidatePath("/complaint/[complaintId]");
  }
};
