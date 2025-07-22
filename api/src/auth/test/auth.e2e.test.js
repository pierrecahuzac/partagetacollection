const request = require('supertest');
const app = require('../../../server');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

describe('E2E: Auth - Signup', () => {
  beforeEach(async () => {
    await prisma.user.deleteMany({ where: { email: 'e2e@mail.com' } });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test('POST /api/auth/signup crée un utilisateur', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({
        email: 'e2e@mail.com',
        password: 'password123',
        passwordConfirmation: 'password123',
        username: 'e2euser',
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user.email).toBe('e2e@mail.com');
  });
}); 