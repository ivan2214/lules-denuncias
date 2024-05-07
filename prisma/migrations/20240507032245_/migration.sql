/*
  Warnings:

  - You are about to drop the column `complaintId` on the `Location` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Location_complaintId_idx";

-- AlterTable
ALTER TABLE "Complaint" ADD COLUMN     "locationId" INTEGER;

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "complaintId";

-- CreateIndex
CREATE INDEX "Complaint_locationId_idx" ON "Complaint"("locationId");
