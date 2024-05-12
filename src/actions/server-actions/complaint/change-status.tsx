"use server";

import {revalidatePath} from "next/cache";
import {StatusComplaint} from "@prisma/client";

import {db} from "@/lib/db";
import {ChangeStatusSchema} from "@/schemas";
import {type ChangeStatusFormValues} from "@/app/(routes)/complaint/[complaintId]/components/button-change-status";

export const changeStatus = async (data: ChangeStatusFormValues) => {
  const {status, complaintId} = data;

  const validatedFields = ChangeStatusSchema.safeParse(data);

  if (!validatedFields.success) {
    return {error: "Algo salio mal!"};
  }

  if (!complaintId) return {error: "Algo salio mal!"};

  try {
    await db.complaint.update({
      where: {
        id: complaintId,
      },
      data: {
        isResolved: status === StatusComplaint.RESOLVED,
        status,
      },
    });

    return {success: "Estado cambiado correctamente"};
  } catch (error) {
    return {error: "Algo salio mal!"};
  } finally {
    revalidatePath("/complaint/[complaintId]");
  }
};
