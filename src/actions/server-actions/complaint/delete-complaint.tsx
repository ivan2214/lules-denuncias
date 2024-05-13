"use server"

import {redirect} from "next/navigation"

import {db} from "@/lib/db"

export const deleteComplaint = async (complaintId: number) => {
  if (!complaintId) return {error: "Complaint not found"}
  try {
    await db.complaint.delete({
      where: {
        id: complaintId,
      },
    })

    return {success: "Complaint deleted"}
  } catch (error) {
    return {error: "Something went wrong"}
  } finally {
    redirect("/")
  }
}
