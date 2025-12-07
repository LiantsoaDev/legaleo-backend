import { PrismaClient } from "@/app/generated/prisma";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Créer une nouvelle instance du client Prisma
const prismaClient = new PrismaClient();

// Vérifier que le modèle ContractType est disponible
if (!('contractType' in prismaClient)) {
  console.warn("⚠️ Le modèle ContractType n'est pas disponible. Veuillez exécuter 'npx prisma generate' et redémarrer le serveur.");
}

export const prisma = globalForPrisma.prisma ?? prismaClient;

// Toujours mettre en cache le client Prisma pour éviter les fuites de connexion
// En production, Next.js réutilise les modules, donc on doit aussi mettre en cache
if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = prisma;
}
