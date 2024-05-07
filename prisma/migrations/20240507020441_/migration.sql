/*
  Warnings:

  - You are about to drop the `_ComplaintToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Complaint" ADD COLUMN     "images" TEXT,
ADD COLUMN     "userId" INTEGER;

-- DropTable
DROP TABLE "_ComplaintToUser";

-- CreateIndex
CREATE INDEX "Complaint_userId_idx" ON "Complaint"("userId");
