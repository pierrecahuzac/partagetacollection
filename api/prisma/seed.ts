//import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
//import * as bcrypt from 'bcryptjs';
import datas from '../prisma/datas.json'
const prisma = new PrismaClient();

async function main() {
  // Création des types de format
  await prisma.formatType.createMany({
    data: datas.formatTypes,
    skipDuplicates: true,
  });

  // Création des conditions
  await prisma.condition.createMany({
    data: datas.conditions,
    skipDuplicates: true,
  });

  // Création des statuts de collection
  await prisma.collectionStatus.createMany({
    data: datas.collectionStatuses,
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
