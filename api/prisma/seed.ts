//import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
//import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  await prisma.formatType.createMany({
    data: [
      { "name": "CD" },
      { "name": "Comics" },
      { "name": "Bande dessinée" },
      { "name": "Bluray" },
      { "name": "DVD" },
      { "name": "Vinyle" }
    ],
    skipDuplicates: true,

  })
  // const demo = await prisma.user.create({
  //   data: {
  //     email: 'demo@collections.com',
  //     username: 'demo',
  //     role: 'USER',
  //     password: await bcrypt.hash('demo', 10),
  //   },
  // });
  // ;

  // let i = 0;
  // while (i < 5) {
  //   const password/* : string  */= faker.internet.password();

  //   const passwordHashed/* : string */ = await bcrypt.hash(password, 10);
  //   const user = await prisma.user.create({
  //     data: {
  //       email: faker.internet.email(),
  //       username: faker.person.lastName(),
  //       role: 'USER',
  //       password: passwordHashed,
  //     },
  //   });

  //   i++;
  // }
  // await prisma.tag.createMany({
  //   data: [
  //     { name: 'Livres' },
  //     { name: 'CD' },
  //     { name: 'Vinyles' },
  //     { name: 'Timbres' },
  //     { name: 'Comics' },
  //     { name: 'BD' },
  //     { name: 'Figurines' },
  //     { name: 'LaserDisc' },
  //     { name: 'Pièces' },
  //     { name: 'Billets' },
  //   ],
  // });
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
