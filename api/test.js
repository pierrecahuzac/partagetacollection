const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const result = await prisma.$queryRaw`SELECT 1`; 
  } catch (error) {
    console.error('Erreur de connexion:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();