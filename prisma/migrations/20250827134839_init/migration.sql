/*
  Warnings:

  - You are about to drop the column `userId` on the `OnboardingStep` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "OnboardingStep" DROP CONSTRAINT "OnboardingStep_userId_fkey";

-- AlterTable
ALTER TABLE "OnboardingStep" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "OnboardingAnswer" (
    "id" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "stepId" TEXT NOT NULL,

    CONSTRAINT "OnboardingAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OnboardingAnswer_userId_stepId_key" ON "OnboardingAnswer"("userId", "stepId");

-- AddForeignKey
ALTER TABLE "OnboardingAnswer" ADD CONSTRAINT "OnboardingAnswer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OnboardingAnswer" ADD CONSTRAINT "OnboardingAnswer_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "OnboardingStep"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
