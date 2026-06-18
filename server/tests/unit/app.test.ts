import request from 'supertest';
import { describe, expect, it } from 'vitest';

import app from '../../src/app';

describe('app', () => {
  it('parses JSON requests and reaches the auth routes', async () => {
    const response = await request(app).post('/login').send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});
