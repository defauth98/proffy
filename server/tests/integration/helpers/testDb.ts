import type { Pool } from 'pg';
import { PostgreSqlContainer, type StartedPostgreSqlContainer } from '@testcontainers/postgresql';

let container: StartedPostgreSqlContainer | null = null;
let pool: Pool | null = null;

export async function startTestDatabase() {
  if (container) {
    return;
  }

  process.env.NODE_ENV = 'test';
  process.env.SECRET = 'test-secret';

  container = await new PostgreSqlContainer('postgres:15-alpine')
    .withDatabase('proffy_test')
    .withUsername('postgres')
    .withPassword('postgres')
    .start();

  process.env.PGHOST = container.getHost();
  process.env.PGPORT = String(container.getPort());
  process.env.PGUSER = container.getUsername();
  process.env.PGPASSWORD = container.getPassword();
  process.env.PGDATABASE = container.getDatabase();
  delete process.env.DATABASE_URL;

  const connection = await import('../../../src/database/connection');
  const migrator = await import('../../../src/database/migrate');

  pool = connection.pool;

  await migrator.migrateDatabase();
}

export async function getPool() {
  if (!pool) {
    throw new Error('Test database has not been started');
  }

  return pool;
}

export async function clearDatabase() {
  const database = await getPool();

  await database.query(
    'TRUNCATE TABLE favorites, connections, class_schedule, classes, users RESTART IDENTITY CASCADE'
  );
}

export async function stopTestDatabase() {
  if (pool) {
    await pool.end();
    pool = null;
  }

  if (container) {
    await container.stop();
    container = null;
  }
}
