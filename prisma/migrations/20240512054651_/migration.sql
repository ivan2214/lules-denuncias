-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "complaintId" INTEGER;

-- CreateIndex
CREATE INDEX "Comment_complaintId_idx" ON "Comment"("complaintId");
