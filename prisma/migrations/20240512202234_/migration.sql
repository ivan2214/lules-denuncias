/*
  Warnings:

  - The primary key for the `CategoriesOnComplaint` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `categoryName` on the `CategoriesOnComplaint` table. All the data in the column will be lost.
  - The primary key for the `Category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `categoryId` to the `CategoriesOnComplaint` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "CategoriesOnComplaint_categoryName_idx";

-- DropIndex
DROP INDEX "Category_name_key";

-- AlterTable
ALTER TABLE "CategoriesOnComplaint" DROP CONSTRAINT "CategoriesOnComplaint_pkey",
DROP COLUMN "categoryName",
ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD CONSTRAINT "CategoriesOnComplaint_pkey" PRIMARY KEY ("complaintId", "categoryId");

-- AlterTable
ALTER TABLE "Category" DROP CONSTRAINT "Category_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Category_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE INDEX "CategoriesOnComplaint_categoryId_idx" ON "CategoriesOnComplaint"("categoryId");
