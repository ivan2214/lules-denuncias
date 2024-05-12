"use server";
import {revalidatePath} from "next/cache";

import {db} from "@/lib/db";
import {CreateCommentSchema} from "@/schemas";
import {type CreateCommentFormValues} from "@/app/(routes)/complaint/[complaintId]/components/comment/comment-form";
import {auth} from "auth";

export const createComment = async (values: CreateCommentFormValues) => {
  const session = await auth();
  const authorId = session?.user?.id;
  const validatedFields = CreateCommentSchema.safeParse(values);

  if (!validatedFields.success) {
    return {error: "Algo salio mal!"};
  }

  const {text, complaintId} = validatedFields.data;

  if (!complaintId) return {error: "Algo salio mal!"};

  try {
    if (!authorId || authorId === undefined || authorId === null) {
      await db.comment.create({
        data: {
          text,
          complaintId,
          anonymous: true,
        },
      });
    }

    if (authorId && authorId !== undefined && authorId !== null) {
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
