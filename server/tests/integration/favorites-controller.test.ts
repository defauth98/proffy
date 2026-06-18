import type { Express } from 'express';
import type { Pool } from 'pg';
import request from 'supertest';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

import { createClass, createSignedInUser } from './helpers/api';
import { clearDatabase, getPool, startTestDatabase, stopTestDatabase } from './helpers/testDb';

describe('FavoritesController integration', () => {
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

  it('creates and deletes favorites using the favorite id returned by the API', async () => {
    const { user, token } = await createSignedInUser(app);

    const classResponse = await createClass(app, token, user.id, {
      subject: 'História',
      cost: 70,
      schedule: [{ week_day: 3, from: '14:00', to: '16:00' }],
    });

    const favoriteResponse = await request(app)
      .post('/favorites')
      .set('Authorization', `Bearer ${token}`)
      .send({ favorite_user_id: user.id, favorited_class_id: classResponse.body.id });

    expect(favoriteResponse.status).toBe(200);
    expect(favoriteResponse.body[0]).toBe(1);

    const favoritesResponse = await request(app)
      .get(`/favorites/${user.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(favoritesResponse.status).toBe(200);
    expect(favoritesResponse.body).toHaveLength(1);
    expect(favoritesResponse.body[0].id).toBe(1);

    await request(app)
      .delete(`/favorites/${favoriteResponse.body[0]}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    const favorites = await pool.query('SELECT * FROM favorites');
    expect(favorites.rows).toHaveLength(0);
  });
});
