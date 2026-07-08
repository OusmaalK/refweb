import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.article.upsert({
    where: { slug: 'audit_oil_gas' },
    update: {},
    create: {
      slug: 'audit_oil_gas',
      title: 'Audit spécifique Oil & Gas',
      subtitle: 'Accompagnement sur-mesure pour les services pétroliers.',
      content: 'Le secteur de l\'énergie en Algérie exige une maîtrise des risques d\'une ampleur exceptionnelle...',
      author: 'RFC Assurance',
      category: 'Secteur Pétrolier',
      imagePath: '/images/blog/audit_oil_gas.jpg',
      lang: 'fr',
    },
  });
}
main();