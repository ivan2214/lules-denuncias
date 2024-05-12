/*
  Warnings:

  - You are about to drop the column `anonymous` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `likes` on the `Comment` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "LikeCommentType" AS ENUM ('LIKE', 'DISLIKE');

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "anonymous",
DROP COLUMN "likes";

-- CreateTable
CREATE TABLE "LikeComment" (
    "id" SERIAL NOT NULL,
    "type" "LikeCommentType" NOT NULL,
    "userLikeId" TEXT NOT NULL,
    "complaintId" INTEGER NOT NULL,
    "commentId" INTEGER NOT NULL,

    CONSTRAINT "LikeComment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LikeComment_commentId_idx" ON "LikeComment"("commentId");

-- CreateIndex
CREATE INDEX "LikeComment_complaintId_idx" ON "LikeComment"("complaintId");

-- CreateIndex
CREATE INDEX "LikeComment_userLikeId_idx" ON "LikeComment"("userLikeId");
