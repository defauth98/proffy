import type { Express } from 'express';
import request from 'supertest';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

import { createSignedInUser } from './helpers/api';
import { clearDatabase, startTestDatabase, stopTestDatabase } from './helpers/testDb';

describe('AuthController integration', () => {
  let app: Express;

  beforeAll(async () => {
    await startTestDatabase();
    app = (await import('../../src/app')).default;
  });

  afterEach(async () => {
    await clearDatabase();
  });

  afterAll(async () => {
    await stopTestDatabase();
  });

  it('rejects protected routes without token', async () => {
    const response = await request(app).get('/classes');

    expect(response.status).toBe(401);
  });

  it('signs up and logs in without returning the password', async () => {
    const { email } = await createSignedInUser(app);

    const loginResponse = await request(app).post('/login').send({
      email,
      password: '123456',
    });

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body.token).toEqual(expect.any(String));
    expect(loginResponse.body.user.email).toBe(email);
    expect(loginResponse.body.user.password).toBeUndefined();
  });
});
