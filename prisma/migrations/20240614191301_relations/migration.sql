/*
  Warnings:

  - You are about to drop the column `Area` on the `Challenges` table. All the data in the column will be lost.
  - Made the column `title` on table `Challenges` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Challenges" DROP COLUMN "Area",
ALTER COLUMN "title" SET NOT NULL;

-- CreateTable
CREATE TABLE "Tags" (
    "id" TEXT NOT NULL,
    "area" TEXT,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ChallengesToTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ChallengesToTags_AB_unique" ON "_ChallengesToTags"("A", "B");

-- CreateIndex
CREATE INDEX "_ChallengesToTags_B_index" ON "_ChallengesToTags"("B");

-- AddForeignKey
ALTER TABLE "_ChallengesToTags" ADD CONSTRAINT "_ChallengesToTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Challenges"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChallengesToTags" ADD CONSTRAINT "_ChallengesToTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
