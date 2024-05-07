-- CreateEnum
CREATE TYPE "StatusComplaint" AS ENUM ('OPEN', 'CLOSED', 'IN_PROGRESS', 'RESOLVED');

-- AlterTable
ALTER TABLE "Complaint" ADD COLUMN     "status" "StatusComplaint" NOT NULL DEFAULT 'OPEN';
