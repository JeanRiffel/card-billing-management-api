
import { BeforeAll, AfterAll, Given, When, Then } from '@cucumber/cucumber';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../../src/app.module';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

Then('the response should contain a JWT token', function () {
  const body = response.body;
  if (!body || typeof body.access_token !== 'string' || body.access_token.length < 10) {
    throw new Error('JWT token not found in response');
  }
});

let app: INestApplication;
let response: request.Response;
const prisma = new PrismaClient();

BeforeAll(async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  app = moduleRef.createNestApplication();
  await app.init();
});

AfterAll(async () => {
  await app.close();
  await prisma.$disconnect();
});



Given('a user exists with email {string} and password {string}', async (email: string, password: string) => {
  // Remove user if exists
  await prisma.user.deleteMany({ where: { email } });
  // Hash the password
  const hash = await bcrypt.hash(password, 10);
  // Create user
  await prisma.user.create({
    data: {
      email,
      name: 'Test User',
      passwordHash: hash,
    },
  });
});



When('I POST {string} with email {string} and password {string}', async (url: string, email: string, password: string) => {
  const server = app.getHttpServer();
  response = await request(server)
    .post(url)
    .send({ email, password });
});



Then('the response status should be {int}', (status: number) => {
  if (response.status !== status) {
    throw new Error(`expected ${status} but got ${response.status}`);
  }
});
