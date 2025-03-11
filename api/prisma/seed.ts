import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

console.log('Bcrypt:', bcrypt);
console.log('Bcrypt hashSync:', bcrypt.hashSync);

async function main() {
  // const demo = await prisma.user.create({
  //   data: {
  //     email: 'demo@collections.com',
  //     username: 'demo',
  //     role: 'USER',
  //     password: await bcrypt.hash('demo', 10),
  //   },
  // });
  // console.log(demo);

  let i = 0;
  while (i < 5) {
    const password: string = faker.internet.password();
    console.log(password);
    const passwordHashed: string = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        username: faker.person.lastName(),
        role: 'USER',
        password: passwordHashed,
      },
    });
    console.log(user);
    i++;
  }
  await prisma.tag.createMany({
    data: [
      { name: 'Livres' },
      { name: 'CD' },
      { name: 'Vinyles' },
      { name: 'Timbres' },
      { name: 'Comics' },
      { name: 'BD' },
      { name: 'Figurines' },
      { name: 'LaserDisc' },
      { name: 'Pièces' },
      { name: 'Billets' },
    ],
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
