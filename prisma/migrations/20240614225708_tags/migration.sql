/*
  Warnings:

  - You are about to drop the `Tags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ChallengesToTags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ChallengesToTags" DROP CONSTRAINT "_ChallengesToTags_A_fkey";

-- DropForeignKey
ALTER TABLE "_ChallengesToTags" DROP CONSTRAINT "_ChallengesToTags_B_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- DropTable
DROP TABLE "Tags";

-- DropTable
DROP TABLE "_ChallengesToTags";

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "area" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ChallengesToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ChallengesToTag_AB_unique" ON "_ChallengesToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_ChallengesToTag_B_index" ON "_ChallengesToTag"("B");

-- AddForeignKey
ALTER TABLE "_ChallengesToTag" ADD CONSTRAINT "_ChallengesToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Challenges"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChallengesToTag" ADD CONSTRAINT "_ChallengesToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
