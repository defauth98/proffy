import type { Express } from 'express';
import type { Pool } from 'pg';
import request from 'supertest';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

import { createClass, createSignedInUser } from './helpers/api';
import { clearDatabase, getPool, startTestDatabase, stopTestDatabase } from './helpers/testDb';

describe('ClassesController integration', () => {
  let app: Express;
  let pool: Pool;

  beforeAll(async () => {
    await startTestDatabase();
    app = (await import('../../src/app')).default;
    pool = await getPool();
  });

  afterEach(async () => {
    await clearDatabase();
  });

  afterAll(async () => {
    await stopTestDatabase();
  });

  it('creates, paginates, filters, and fetches classes using PostgreSQL', async () => {
    const { user, token } = await createSignedInUser(app);

    const createClassResponse = await createClass(app, token, user.id);

    expect(createClassResponse.body.id).toBe(1);

    const allClassesResponse = await request(app)
      .get('/classes')
      .set('Authorization', `Bearer ${token}`);

    expect(allClassesResponse.status).toBe(200);
    expect(allClassesResponse.body).toHaveLength(1);
    expect(allClassesResponse.body[0]).toMatchObject({
      class_id: 1,
      user_id: user.id,
      subject: 'Matemática',
    });

    const filteredClassesResponse = await request(app)
      .get('/classes')
      .set('Authorization', `Bearer ${token}`)
      .query({ subject: 'Matemática', week_day: 1, time: '09:00' });

    expect(filteredClassesResponse.status).toBe(200);
    expect(filteredClassesResponse.body).toHaveLength(1);

    const userClassResponse = await request(app)
      .get(`/classes/${user.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(userClassResponse.status).toBe(200);
    expect(userClassResponse.body.schedule[0]).toMatchObject({
      class_id: 1,
      from: 480,
      to: 720,
    });

    const persistedSchedules = await pool.query('SELECT * FROM class_schedule');
    expect(persistedSchedules.rows).toHaveLength(1);
  });
});
