"use server";
import {revalidatePath} from "next/cache";

import {db} from "@/lib/db";
import {CommentActionSchema} from "@/schemas";
import {type CommentActionFormValues} from "@/app/(routes)/complaint/[complaintId]/components/comment/button-actions-comments";
import {auth} from "auth";

export const actionsComment = async (values: CommentActionFormValues) => {
  const session = await auth();
  const userLikeId = session?.user?.id;
  const validatedFields = CommentActionSchema.safeParse(values);

  if (!validatedFields.success) {
    return {error: "Algo salio mal!"};
  }

  const {commentId, action} = validatedFields.data;

  try {
    const comment = await db.comment.findUnique({
      where: {
        id: commentId,
      },
    });

    if (!comment) {
      return {error: "Comentario no encontrado"};
    }

    if (!userLikeId || userLikeId === undefined || userLikeId === null) {
      return {error: "Debe iniciar sesion para realizar esta accion!"};
    }
    if (comment.authorId === userLikeId)
      return {error: "No puedes dar like a tu propio comentario"};

    const createLikeComment = await db.likeComment.create({
      data: {
        type: action === "like" ? "LIKE" : "UNLIKE",
        userLikeId,
        commentId,
      },
    });

    if (createLikeComment) {
      return {success: "Comentario dado like!"};
    }
  } catch (error) {
    return {error: "Algo salio mal!"};
  } finally {
    revalidatePath("/complaint/[complaintId]");
  }
};
