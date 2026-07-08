import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const username = 'admin'; 
  const password = 'khaled2026';

  const passwordHash = await bcrypt.hash(password, 10);

  const admin = await prisma.user.upsert({
    where: { username: username },
    update: {
      passwordHash: passwordHash, // Met à jour le mot de passe si l'utilisateur existe déjà
    },
    create: {
      username: username,
      passwordHash: passwordHash,
    },
  });

  console.log('Utilisateur administrateur configuré avec succès :', {
    username: admin.username,
    password: 'khaled2026'
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());