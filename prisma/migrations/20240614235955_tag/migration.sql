/*
  Warnings:

  - The primary key for the `Tag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Tag` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `B` on the `_ChallengesToTag` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "_ChallengesToTag" DROP CONSTRAINT "_ChallengesToTag_B_fkey";

-- AlterTable
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Tag_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "_ChallengesToTag" DROP COLUMN "B",
ADD COLUMN     "B" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "_ChallengesToTag_AB_unique" ON "_ChallengesToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_ChallengesToTag_B_index" ON "_ChallengesToTag"("B");

-- AddForeignKey
ALTER TABLE "_ChallengesToTag" ADD CONSTRAINT "_ChallengesToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
