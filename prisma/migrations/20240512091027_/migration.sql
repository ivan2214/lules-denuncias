/*
  Warnings:

  - You are about to drop the column `complaintId` on the `Category` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Category_complaintId_idx";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "complaintId",
ADD CONSTRAINT "Category_pkey" PRIMARY KEY ("name");

-- CreateTable
CREATE TABLE "ComplaintCategory" (
    "complaintId" INTEGER NOT NULL,
    "categoryName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CategoryToComplaint" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE INDEX "ComplaintCategory_categoryName_idx" ON "ComplaintCategory"("categoryName");

-- CreateIndex
CREATE UNIQUE INDEX "ComplaintCategory_complaintId_key" ON "ComplaintCategory"("complaintId");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToComplaint_AB_unique" ON "_CategoryToComplaint"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToComplaint_B_index" ON "_CategoryToComplaint"("B");
