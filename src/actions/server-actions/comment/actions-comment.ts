"use server";
import {revalidatePath} from "next/cache";

import {db} from "@/lib/db";
import {CommentActionSchema} from "@/schemas";
import {type CommentActionFormValues} from "@/app/(routes)/complaint/[complaintId]/components/comment/button-actions-comments";
import {auth} from "auth";

export const actionsComment = async (values: CommentActionFormValues) => {
  const session = await auth();
  const authorId = session?.user?.id;
  const validatedFields = CommentActionSchema.safeParse(values);

  if (!validatedFields.success) {
    return {error: "Algo salio mal!"};
  }

  const {commentId, action, complaintId} = validatedFields.data;

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

    //verificar que no puedo darme me gusta a mi mismo

    if (authorId === comment.authorId) return {error: "No puedes dar like a tu propio comentario"};

    //verificar que no pueda dar like a un comentario ya dado like por el mismo usuario

    if (comment.authorId === authorId) return {error: "No puedes dar like a tu propio comentario"};

    if (!authorId || authorId === undefined || authorId === null) {
      return {error: "Debe iniciar sesion para realizar esta accion!"};
    }

    if (action === "like" && authorId && authorId !== undefined && authorId !== null) {
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

    if (action === "unlike" && authorId && authorId !== undefined && authorId !== null) {
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
