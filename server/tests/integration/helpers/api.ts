import type { Express } from 'express';
import request from 'supertest';
import { expect } from 'vitest';

export async function createSignedInUser(app: Express) {
  const email = `user-${Date.now()}-${Math.random()}@example.com`;

  const signupResponse = await request(app).post('/signup').send({
    name: 'Ada',
    surname: 'Lovelace',
    email,
    password: '123456',
  });

  expect(signupResponse.status).toBe(201);

  return {
    user: signupResponse.body.user[0],
    token: signupResponse.body.token as string,
    email,
  };
}

export async function createClass(app: Express, token: string, userId: number, overrides = {}) {
  const response = await request(app)
    .post('/classes')
    .set('Authorization', `Bearer ${token}`)
    .send({
      user_id: userId,
      subject: 'Matemática',
      cost: 80,
      schedule: [{ week_day: 1, from: '08:00', to: '12:00' }],
      ...overrides,
    });

  expect(response.status).toBe(201);

  return response;
}
