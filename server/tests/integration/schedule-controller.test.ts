import type { Express } from 'express';
import type { Pool } from 'pg';
import request from 'supertest';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

import { createClass, createSignedInUser } from './helpers/api';
import { clearDatabase, getPool, startTestDatabase, stopTestDatabase } from './helpers/testDb';

describe('ScheduleController integration', () => {
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

  it('adds and removes schedule items by user id', async () => {
    const { user, token } = await createSignedInUser(app);

    await createClass(app, token, user.id, {
      subject: 'Física',
      cost: 90,
      schedule: [{ week_day: 2, from: '10:00', to: '11:00' }],
    });

    await request(app)
      .post(`/schedule/${user.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    const schedulesAfterCreate = await pool.query('SELECT * FROM class_schedule ORDER BY id');
    expect(schedulesAfterCreate.rows).toHaveLength(2);

    await request(app)
      .delete(`/schedule/${user.id}/${schedulesAfterCreate.rows[1].id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    const schedulesAfterDelete = await pool.query('SELECT * FROM class_schedule');
    expect(schedulesAfterDelete.rows).toHaveLength(1);
  });
});
