import bcrypt from 'bcryptjs';

import { pool } from './connection';
import { migrateDatabase } from './migrate';

export async function seedDatabase() {
  await migrateDatabase();

  await pool.query(
    'TRUNCATE TABLE favorites, connections, class_schedule, classes, users RESTART IDENTITY CASCADE'
  );

  const password = await bcrypt.hash('123456', 10);

  await pool.query(
    `INSERT INTO users (name, surname, email, password, avatar, whatsapp, bio)
     VALUES
      ($1, $2, $3, $4, $5, $6, $7),
      ($8, $9, $10, $11, $12, $13, $14)`,
    [
      'Daniel',
      'Ribeiro',
      'daniel@example.com',
      password,
      'https://github.com/defauth98.png',
      '11999999999',
      'Professor de matemática',
      'Ada',
      'Lovelace',
      'ada@example.com',
      password,
      'https://github.com/github.png',
      '11888888888',
      'Professora de física',
    ]
  );

  await pool.query(
    `INSERT INTO classes (subject, cost, user_id)
     VALUES ($1, $2, $3), ($4, $5, $6)`,
    ['Matemática', 80, 1, 'Física', 90, 2]
  );

  await pool.query(
    `INSERT INTO class_schedule (week_day, "from", "to", class_id)
     VALUES ($1, $2, $3, $4), ($5, $6, $7, $8)`,
    [1, 480, 720, 1, 2, 600, 780, 2]
  );

  await pool.query('INSERT INTO connections (user_id) VALUES ($1), ($2)', [1, 2]);
}

if (require.main === module) {
  seedDatabase()
    .then(async () => {
      await pool.end();
      console.log('Database seeded successfully');
    })
    .catch(async (error) => {
      await pool.end();
      console.error(error);
      process.exit(1);
    });
}
