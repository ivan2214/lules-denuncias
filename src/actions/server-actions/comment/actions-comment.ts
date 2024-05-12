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

    if (!complaintId) return {error: "Algo sasdasalio mal!!!"};

    //verificar que no puedo darme me gusta a mi mismo

    if (comment.authorId === userLikeId)
      return {error: "No puedes dar like a tu propio comentario"};

    if (!userLikeId || userLikeId === undefined || userLikeId === null) {
      return {error: "Debe iniciar sesion para realizar esta accion!"};
    }

    await db.comment.update({
      where: {
        id: commentId,
      },
      data: {
        likes: action === "like" ? {increment: 1} : {decrement: 1},
      },
    });

    return {success: "Comentario actualizado"};
  } catch (error) {
    console.log(error);

    return {error: "Algo salio mal!"};
  } finally {
    revalidatePath("/complaint/[complaintId]");
  }
};
