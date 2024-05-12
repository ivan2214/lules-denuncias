/*
  Warnings:

  - You are about to drop the column `complaintId` on the `Comment` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Comment_complaintId_idx";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "complaintId";
