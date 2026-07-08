// check-db.ts
import { prisma } from './lib/prisma';

async function checkDB() {
  console.log('🔍 Vérification de la base de données...');
  console.log(`📌 URL: ${process.env.DATABASE_URL?.substring(0, 50)}...`);
  
  try {
    const tables = ['Article', 'Subscriber', 'User'];
    for (const table of tables) {
      try {
        const model = table.toLowerCase();
        const count = await (prisma as any)[model].count();
        console.log(`✅ Table ${table}: ${count} enregistrements`);
      } catch (e: any) {
        if (e.message?.includes('no such table')) {
          console.log(`❌ Table ${table}: inexistante`);
        } else {
          console.log(`❌ Table ${table}: erreur - ${e.message}`);
        }
      }
    }
  } catch (error) {
    console.error('❌ Erreur générale:', error);
  }
}

checkDB()
  .catch(console.error)
  .finally(() => process.exit(0));