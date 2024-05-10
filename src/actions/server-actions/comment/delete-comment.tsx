"use server";

import {revalidatePath} from "next/cache";

import {db} from "@/lib/db";

export const deleteComment = async (commentId: number) => {
  try {
    await db.comment.delete({
      where: {
        id: commentId,
      },
    });

    return {success: "Comentario eliminado"};
  } catch (error) {
    return {error: "Algo salio mal!"};
  } finally {
    revalidatePath("/complaint/[complaintId]");
  }
};
