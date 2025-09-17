/*
  Warnings:

  - The primary key for the `Onboarding` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `description` on the `Onboarding` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `Onboarding` table. All the data in the column will be lost.
  - You are about to drop the column `placeholder` on the `Onboarding` table. All the data in the column will be lost.
  - You are about to drop the column `stepId` on the `Onboarding` table. All the data in the column will be lost.
  - You are about to drop the column `tips` on the `Onboarding` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Onboarding` table. All the data in the column will be lost.
  - You are about to drop the `Option` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Step` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserStep` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `Onboarding` table without a default value. This is not possible if the table is not empty.
  - Made the column `title` on table `Onboarding` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_onboardingId_fkey";

-- DropForeignKey
ALTER TABLE "Onboarding" DROP CONSTRAINT "Onboarding_stepId_fkey";

-- DropForeignKey
ALTER TABLE "Onboarding" DROP CONSTRAINT "Onboarding_userId_fkey";

-- DropForeignKey
ALTER TABLE "Option" DROP CONSTRAINT "Option_onboardingId_fkey";

-- DropForeignKey
ALTER TABLE "UserStep" DROP CONSTRAINT "UserStep_stepId_fkey";

-- DropForeignKey
ALTER TABLE "UserStep" DROP CONSTRAINT "UserStep_userId_fkey";

-- DropIndex
DROP INDEX "Onboarding_stepId_key";

-- DropIndex
DROP INDEX "Onboarding_userId_key";

-- AlterTable
ALTER TABLE "File" ALTER COLUMN "onboardingId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Onboarding" DROP CONSTRAINT "Onboarding_pkey",
DROP COLUMN "description",
DROP COLUMN "duration",
DROP COLUMN "placeholder",
DROP COLUMN "stepId",
DROP COLUMN "tips",
DROP COLUMN "userId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "title" SET NOT NULL,
ADD CONSTRAINT "Onboarding_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Onboarding_id_seq";

-- DropTable
DROP TABLE "Option";

-- DropTable
DROP TABLE "Step";

-- DropTable
DROP TABLE "UserStep";

-- CreateTable
CREATE TABLE "OnboardingStep" (
    "id" TEXT NOT NULL,
    "stepNumber" INTEGER NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "duration" TEXT,
    "placeholder" TEXT,
    "tips" TEXT,
    "options" TEXT[],
    "now" TEXT[],
    "prevision" TEXT[],
    "optionsMultiples" TEXT[],
    "onboardingId" TEXT NOT NULL,

    CONSTRAINT "OnboardingStep_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OnboardingStep" ADD CONSTRAINT "OnboardingStep_onboardingId_fkey" FOREIGN KEY ("onboardingId") REFERENCES "Onboarding"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_onboardingId_fkey" FOREIGN KEY ("onboardingId") REFERENCES "OnboardingStep"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
