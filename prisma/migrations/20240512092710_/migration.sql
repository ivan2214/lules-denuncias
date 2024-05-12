/*
  Warnings:

  - You are about to drop the `ComplaintCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoryToComplaint` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ComplaintCategory";

-- DropTable
DROP TABLE "_CategoryToComplaint";

-- CreateTable
CREATE TABLE "CategoriesOnComplaint" (
    "complaintId" INTEGER NOT NULL,
    "categoryName" TEXT NOT NULL,
    "asignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CategoriesOnComplaint_pkey" PRIMARY KEY ("complaintId","categoryName")
);

-- CreateIndex
CREATE INDEX "CategoriesOnComplaint_categoryName_idx" ON "CategoriesOnComplaint"("categoryName");
