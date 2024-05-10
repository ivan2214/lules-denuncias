"use server";
import {revalidatePath} from "next/cache";

import {db} from "@/lib/db";
import {CreateCommentSchema} from "@/schemas";
import {type CreateCommentFormValues} from "@/app/(routes)/complaint/[complaintId]/components/comment/comment-form";

export const createComment = async (values: CreateCommentFormValues) => {
  const validatedFields = CreateCommentSchema.safeParse(values);

  if (!validatedFields.success) {
    return {error: "Algo salio mal!"};
  }

  const {text, complaintId, authorId} = validatedFields.data;

  if (!complaintId) return {error: "Algo salio mal!"};

  try {
    if (!authorId || authorId === undefined || authorId === null || authorId === 0) {
      await db.comment.create({
        data: {
          text,
          complaintId,
          anonymous: true,
        },
      });
    }

    if (authorId && authorId !== undefined && authorId !== null && authorId !== 0) {
      await db.comment.create({
        data: {
          text,
          complaintId,
          authorId,
          anonymous: false,
        },
      });
    }

    return {succes: "Comentario creado correctamente"};
  } catch (error) {
    return {error: "Algo salio mal!"};
  } finally {
    revalidatePath("/complaint/[complaintId]");
  }
};
