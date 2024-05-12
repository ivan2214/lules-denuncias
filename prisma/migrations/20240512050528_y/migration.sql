/*
  Warnings:

  - You are about to drop the column `complaintId` on the `LikeComment` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "LikeComment_complaintId_idx";

-- AlterTable
ALTER TABLE "LikeComment" DROP COLUMN "complaintId";
