
-- DropForeignKey
ALTER TABLE "Candidato" DROP CONSTRAINT "Candidato_userId_fkey";

-- DropForeignKey
ALTER TABLE "Challenge" DROP CONSTRAINT "Challenge_candidatoId_fkey";

-- DropForeignKey
ALTER TABLE "HardSkillUser" DROP CONSTRAINT "HardSkillUser_candidatoId_fkey";

-- DropForeignKey
ALTER TABLE "LanguageUser" DROP CONSTRAINT "LanguageUser_candidatoId_fkey";

-- DropForeignKey
ALTER TABLE "Quiz" DROP CONSTRAINT "Quiz_candidatoId_fkey";

-- DropForeignKey
ALTER TABLE "Quiz" DROP CONSTRAINT "Quiz_skillLevelId_fkey";

-- DropForeignKey
ALTER TABLE "Quiz" DROP CONSTRAINT "Quiz_userId_fkey";

-- DropForeignKey
ALTER TABLE "QuizQuestion" DROP CONSTRAINT "QuizQuestion_questionId_fkey";

-- DropForeignKey
ALTER TABLE "QuizQuestion" DROP CONSTRAINT "QuizQuestion_quizId_fkey";

-- DropForeignKey
ALTER TABLE "RolUser" DROP CONSTRAINT "RolUser_candidatoId_fkey";

-- DropForeignKey
ALTER TABLE "SkillLevel" DROP CONSTRAINT "SkillLevel_cellId_fkey";

-- DropForeignKey
ALTER TABLE "Socials" DROP CONSTRAINT "Socials_candidatoId_fkey";

-- DropForeignKey
ALTER TABLE "SoftSkillUser" DROP CONSTRAINT "SoftSkillUser_candidatoId_fkey";

-- AlterTable
ALTER TABLE "Challenge" DROP COLUMN "candidatoId";

-- AlterTable
ALTER TABLE "HardSkillUser" DROP COLUMN "candidatoId";

-- AlterTable
ALTER TABLE "LanguageUser" DROP COLUMN "candidatoId";

-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "candidatoId",
DROP COLUMN "created_by_id",
DROP COLUMN "skillLevelId",
DROP COLUMN "skill_level_id",
DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "RolUser" DROP COLUMN "candidatoId";

-- AlterTable
ALTER TABLE "Socials" DROP COLUMN "candidatoId";

-- AlterTable
ALTER TABLE "SoftSkillUser" DROP COLUMN "candidatoId";

-- DropTable
DROP TABLE "Candidato";

-- DropTable
DROP TABLE "QuizQuestion";

-- DropTable
DROP TABLE "SkillLevel";

-- CreateTable
CREATE TABLE "_UserQuizzes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_UserChallenges" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_UserHardSkills" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_UserSoftSkills" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_UserLanguages" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_UserRoles" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_UserSocials" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserQuizzes_AB_unique" ON "_UserQuizzes"("A", "B");

-- CreateIndex
CREATE INDEX "_UserQuizzes_B_index" ON "_UserQuizzes"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserChallenges_AB_unique" ON "_UserChallenges"("A", "B");

-- CreateIndex
CREATE INDEX "_UserChallenges_B_index" ON "_UserChallenges"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserHardSkills_AB_unique" ON "_UserHardSkills"("A", "B");

-- CreateIndex
CREATE INDEX "_UserHardSkills_B_index" ON "_UserHardSkills"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserSoftSkills_AB_unique" ON "_UserSoftSkills"("A", "B");

-- CreateIndex
CREATE INDEX "_UserSoftSkills_B_index" ON "_UserSoftSkills"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserLanguages_AB_unique" ON "_UserLanguages"("A", "B");

-- CreateIndex
CREATE INDEX "_UserLanguages_B_index" ON "_UserLanguages"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserRoles_AB_unique" ON "_UserRoles"("A", "B");

-- CreateIndex
CREATE INDEX "_UserRoles_B_index" ON "_UserRoles"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserSocials_AB_unique" ON "_UserSocials"("A", "B");

-- CreateIndex
CREATE INDEX "_UserSocials_B_index" ON "_UserSocials"("B");

-- AddForeignKey
ALTER TABLE "_UserQuizzes" ADD CONSTRAINT "_UserQuizzes_A_fkey" FOREIGN KEY ("A") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserQuizzes" ADD CONSTRAINT "_UserQuizzes_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserChallenges" ADD CONSTRAINT "_UserChallenges_A_fkey" FOREIGN KEY ("A") REFERENCES "Challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserChallenges" ADD CONSTRAINT "_UserChallenges_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserHardSkills" ADD CONSTRAINT "_UserHardSkills_A_fkey" FOREIGN KEY ("A") REFERENCES "HardSkillUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserHardSkills" ADD CONSTRAINT "_UserHardSkills_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserSoftSkills" ADD CONSTRAINT "_UserSoftSkills_A_fkey" FOREIGN KEY ("A") REFERENCES "SoftSkillUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserSoftSkills" ADD CONSTRAINT "_UserSoftSkills_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserLanguages" ADD CONSTRAINT "_UserLanguages_A_fkey" FOREIGN KEY ("A") REFERENCES "LanguageUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserLanguages" ADD CONSTRAINT "_UserLanguages_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserRoles" ADD CONSTRAINT "_UserRoles_A_fkey" FOREIGN KEY ("A") REFERENCES "RolUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserRoles" ADD CONSTRAINT "_UserRoles_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserSocials" ADD CONSTRAINT "_UserSocials_A_fkey" FOREIGN KEY ("A") REFERENCES "Socials"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserSocials" ADD CONSTRAINT "_UserSocials_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
