import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const allArticles = await prisma.article.findMany();
  console.log("Articles trouvés dans la base :", allArticles);
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());