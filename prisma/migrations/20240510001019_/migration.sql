/*
  Warnings:

  - You are about to drop the column `locationId` on the `Complaint` table. All the data in the column will be lost.
  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "Complaint_locationId_idx";

-- AlterTable
ALTER TABLE "Complaint" DROP COLUMN "locationId",
ADD COLUMN     "address" TEXT;

-- DropTable
DROP TABLE "Location";
