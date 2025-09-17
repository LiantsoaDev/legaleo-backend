/*
  Warnings:

  - You are about to drop the column `stepId` on the `OnboardingAnswer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,onboarding_id]` on the table `OnboardingAnswer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `onboarding_id` to the `OnboardingAnswer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OnboardingAnswer" DROP CONSTRAINT "OnboardingAnswer_stepId_fkey";

-- DropIndex
DROP INDEX "OnboardingAnswer_userId_stepId_key";

-- AlterTable
ALTER TABLE "OnboardingAnswer" DROP COLUMN "stepId",
ADD COLUMN     "onboarding_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "OnboardingAnswer_userId_onboarding_id_key" ON "OnboardingAnswer"("userId", "onboarding_id");

-- AddForeignKey
ALTER TABLE "OnboardingAnswer" ADD CONSTRAINT "OnboardingAnswer_onboarding_id_fkey" FOREIGN KEY ("onboarding_id") REFERENCES "Onboarding"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
