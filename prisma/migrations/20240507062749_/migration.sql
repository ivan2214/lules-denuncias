/*
  Warnings:

  - You are about to drop the `_CategoryToComplaint` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "complaintId" INTEGER;

-- DropTable
DROP TABLE "_CategoryToComplaint";

-- CreateIndex
CREATE INDEX "Category_complaintId_idx" ON "Category"("complaintId");
