const prisma = require("./prismaClient");
const bcrypt = require("bcryptjs");
const datas = require("./datas.json");

const seedDB = async () => {
  // création du super admin

  const hashedPassword = await bcrypt.hash(process.env.SUPER_ADMIN_PASSWORD, 10);
  console.log(hashedPassword);

  await prisma.user.create({
    data: {
      username: process.env.SUPER_ADMIN_USERNAME,
      email: process.env.SUPER_ADMIN_EMAIL,
      password: hashedPassword,
      role: "SUPER_ADMIN",
      status: {
        connect: {
          name: "ACTIVE"
        }
      }
    },
  });
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
