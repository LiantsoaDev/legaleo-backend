-- Script pour créer la table Contract dans la base de données
-- Exécutez ce script directement dans votre base de données PostgreSQL

-- CreateTable
CREATE TABLE IF NOT EXISTS "Contract" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contractTypeId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "duration" TEXT,
    "jurisdiction" TEXT,
    "specificClause" TEXT,
    "cocontractantId" TEXT,
    "content" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contract_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX IF NOT EXISTS "Contract_userId_idx" ON "Contract"("userId");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "Contract_contractTypeId_idx" ON "Contract"("contractTypeId");

-- AddForeignKey
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'Contract_contractTypeId_fkey'
    ) THEN
        ALTER TABLE "Contract" 
        ADD CONSTRAINT "Contract_contractTypeId_fkey" 
        FOREIGN KEY ("contractTypeId") 
        REFERENCES "ContractType"("id") 
        ON DELETE RESTRICT 
        ON UPDATE CASCADE;
    END IF;
END $$;

-- AddForeignKey
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'Contract_userId_fkey'
    ) THEN
        ALTER TABLE "Contract" 
        ADD CONSTRAINT "Contract_userId_fkey" 
        FOREIGN KEY ("userId") 
        REFERENCES "User"("id") 
        ON DELETE RESTRICT 
        ON UPDATE CASCADE;
    END IF;
END $$;
