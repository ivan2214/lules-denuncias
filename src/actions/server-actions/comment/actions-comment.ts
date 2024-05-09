"use server";
import {revalidatePath} from "next/cache";

import {type CommentActionFormValues} from "@/app/(routes)/complaint/[complaintId]/components/button-actions-comments";
import {db} from "@/lib/db";
import {CommentActionSchema} from "@/schemas";

export const actionsComment = async (values: CommentActionFormValues) => {
  const validatedFields = CommentActionSchema.safeParse(values);

  if (!validatedFields.success) {
    return {error: "Algo salio mal!"};
  }

  const {commentId, action, complaintId, authorId} = validatedFields.data;

  try {
    const comment = await db.comment.findUnique({
      where: {
        id: commentId,
      },
    });

    if (!comment) {
      return {error: "Comentario no encontrado"};
    }

    if (!complaintId) return {error: "Algo salio mal!"};

    if (
      !authorId ||
      authorId === undefined ||
      authorId === null ||
      (authorId === 0 && action === "like")
    ) {
      await db.comment.update({
        where: {
          id: commentId,
        },
        data: {
          likes: {
            increment: 1,
          },
          anonymous: true,
          complaintId,
        },
      });
    }

    if (
      !authorId ||
      authorId === undefined ||
      authorId === null ||
      (authorId === 0 && action === "unlike")
    ) {
      await db.comment.update({
        where: {
          id: commentId,
        },
        data: {
          likes: {
            decrement: 1,
          },
          anonymous: true,
          complaintId,
        },
      });
    }

    if (
      action === "like" &&
      authorId &&
      authorId !== undefined &&
      authorId !== null &&
      authorId !== 0
    ) {
      await db.comment.update({
        where: {
          id: commentId,
        },
        data: {
          likes: {
            increment: 1,
          },
          authorId,
          complaintId,
        },
      });
    }

    if (
      action === "unlike" &&
      authorId &&
      authorId !== undefined &&
      authorId !== null &&
      authorId !== 0
    ) {
      await db.comment.update({
        where: {
          id: commentId,
        },
        data: {
          likes: {
            decrement: 1,
          },
          authorId,
          complaintId,
        },
      });
    }
    console.log("hola");
  } catch (error) {
    return {error: "Algo salio mal!"};
  } finally {
    revalidatePath("/complaint/[complaintId]");
  }
};
