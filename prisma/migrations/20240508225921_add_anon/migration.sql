-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "anonymous" BOOLEAN DEFAULT false,
ALTER COLUMN "authorId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Complaint" ADD COLUMN     "anonymous" BOOLEAN DEFAULT false,
ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "username" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "password" DROP NOT NULL,
ALTER COLUMN "reputation" DROP NOT NULL;
