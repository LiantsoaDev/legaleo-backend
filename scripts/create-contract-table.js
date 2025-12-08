/**
 * Script Node.js pour créer la table Contract dans la base de données
 * Usage: node scripts/create-contract-table.js
 */

const { PrismaClient } = require('../app/generated/prisma');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function createContractTable() {
  try {
    console.log('📝 Création de la table Contract...');
    
    const sqlPath = path.join(__dirname, 'create-contract-table.sql');
    const sql = fs.readFileSync(sqlPath, 'utf-8');
    
    // Exécuter le SQL directement
    await prisma.$executeRawUnsafe(sql);
    
    console.log('✅ Table Contract créée avec succès !');
    
    // Vérifier que la table existe
    const result = await prisma.$queryRawUnsafe(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'Contract';
    `);
    
    if (result && result.length > 0) {
      console.log('✅ Vérification : La table Contract existe bien dans la base de données');
    } else {
      console.warn('⚠️  La table Contract n\'a pas été trouvée après création');
    }
    
  } catch (error) {
    console.error('❌ Erreur lors de la création de la table:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

createContractTable()
  .then(() => {
    console.log('✅ Script terminé avec succès');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Erreur fatale:', error);
    process.exit(1);
  });
