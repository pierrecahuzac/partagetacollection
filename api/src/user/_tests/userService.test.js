// userService.test.js
const userService = require("../service");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

beforeEach(async () => {
  // Nettoie la base (supprime l'utilisateur s'il existe)
  await prisma.user.deleteMany({
    where: { email: "test@mail.com" },
  });
});

afterAll(async () => {
  await prisma.user.deleteMany({
    where: { email: "test@mail.com" },
  });
  await prisma.$disconnect();
});

test("création d'un utilisateur", async () => {
  const user = await userService.create(
    "test@mail.com",
    "password",
    "testuser"
  );
  expect(user.email).toBe("test@mail.com");
});

test("connexion d'un utilisateur", async () => {
  // On crée l'utilisateur AVANT de tester la connexion
  await userService.create("test@mail.com", "password", "testuser");
  const user = await userService.findByEmail("test@mail.com");
  expect(user.email).toBe("test@mail.com");
});

test("suppression d'un utilisateur", async () => {
  await userService.create("test@mail.com", "password", "testuser");
  const deleted = await userService.remove(
    (
      await userService.findByEmail("test@mail.com")
    ).id
  );
  expect(deleted.email).toBe("test@mail.com");
  // Vérifie qu'il n'existe plus
  const user = await userService.findByEmail("test@mail.com");
  expect(user).toBeNull();
});

test("recherche d'un utilisateur inexistant retourne null", async () => {
  const user = await userService.findByEmail("inconnu@mail.com");
  expect(user).toBeNull();
});

// // À adapter selon ta méthode update
// test("mise à jour du username d'un utilisateur", async () => {
//     await userService.create("test@mail.com", "password", "testuser");
//     const user = await userService.findByEmail("test@mail.com");
//     // Supposons que tu as userService.update(id, { username: "nouveau" })
//     const updated = await userService.update(user.id, { username: "nouveau" });
//     expect(updated.username).toBe("nouveau");
//   });
