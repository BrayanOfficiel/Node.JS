const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const championsData = require('./champions.json');

async function main() {
  for (const champ of championsData) {
    await prisma.champion.create({
      data: champ,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
