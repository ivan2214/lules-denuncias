/*
  Warnings:

  - Made the column `userId` on table `Complaint` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Complaint" ALTER COLUMN "userId" SET NOT NULL;
