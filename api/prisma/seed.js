const prisma = require("./prismaClient");
const bcrypt = require("bcryptjs");
const datas = require("./datas.json");

const seedDB = async () => {
  // Création des types de rôle
  const roles = await prisma.role.createMany({
    data: datas.roles,
    skipDuplicates: true,
  });
  console.log(roles);

  // Création des status utilisateur
  await prisma.userStatus.createMany({
    data: datas.userStatuses,
    skipDuplicates: true,
  });

  const hashPassword = async (password) => {
    const hasedPassword = await bcrypt.hash(password, 10);
    return hasedPassword;
  };

  // création du super admin
  await prisma.user.create({
    data: {
      username: process.env.SUPER_ADMIN_USERNAME,
      email: process.env.SUPER_ADMIN_EMAIL,
      password: await hashPassword(process.env.SUPER_ADMIN_PASSWORD),
      role: {
        connect: {
          name: "SUPER_ADMIN",
        },
      },
      status: {
        connect: {
          name: "ACTIVE",
        },
      },
    },
  });
  // création de l'utilisateur supprimé

  await prisma.user.create({
    data: {
      username: process.env.DELETED_USER_USERNAME,
      email: process.env.DELETED_USER_EMAIL,
      password: await hashPassword(process.env.DELETED_USER_PASSWORD),
      canLogin: false,
      role: {
        connect: {
          name: "DELETED_USER",
        },
      },
      status: {
        connect: {
          name: "DELETED",
        },
      },
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
