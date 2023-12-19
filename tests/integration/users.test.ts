import httpStatus from 'http-status';
import supertest from 'supertest';
import app from '@/app';
import { buildCategory, generateCategory } from '../factories/categories.factory';
import cleanDb from '../helpers';
import { faker } from '@faker-js/faker';

const server = supertest(app);

beforeEach(async () => {
  await cleanDb();
});

describe('POST /users', () => {
  it('should respond with status 201 and create a user', async () => {
    const name = faker.person.firstName();
    const response = await server.post('/users').send({ name });
    expect(response.status).toBe(httpStatus.CREATED);
    expect(response.body).toEqual(expect.objectContaining({ name }));
  });
});
