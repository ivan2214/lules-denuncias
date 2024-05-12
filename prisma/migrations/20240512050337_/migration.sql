/*
  Warnings:

  - The values [DISLIKE] on the enum `LikeCommentType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "LikeCommentType_new" AS ENUM ('LIKE', 'UNLIKE');
ALTER TABLE "LikeComment" ALTER COLUMN "type" TYPE "LikeCommentType_new" USING ("type"::text::"LikeCommentType_new");
ALTER TYPE "LikeCommentType" RENAME TO "LikeCommentType_old";
ALTER TYPE "LikeCommentType_new" RENAME TO "LikeCommentType";
DROP TYPE "LikeCommentType_old";
COMMIT;
