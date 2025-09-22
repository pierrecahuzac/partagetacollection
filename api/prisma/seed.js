const prisma = require("./prismaClient");

const datas = require("./datas.json");

const seedDB = async () => {
  
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

  // Création des status de collection
  await prisma.collectionStatus.createMany({
    data: datas.collectionStatuses,
    skipDuplicates: true,
  });
  // Création des status des objets
  await prisma.itemStatus.createMany({
    data: datas.itemStatuses,
    skipDuplicates: true,
  });
  // Création des status utilisateur
  await prisma.userStatus.createMany({
    data: datas.userStatuses,
    skipDuplicates: true,
  });
  await prisma.collectionVisibility.createMany({
    data: datas.collectionVisibility,
    skipDuplicates: true,
  });
};

seedDB()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
