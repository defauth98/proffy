import fs from 'fs';
import path from 'path';

import { pool } from './connection';

export async function migrateDatabase() {
  const schemaPathCandidates = [
    path.resolve(__dirname, 'schema.sql'),
    path.resolve(process.cwd(), 'src', 'database', 'schema.sql'),
  ];
  const schemaPath = schemaPathCandidates.find((candidate) => fs.existsSync(candidate));

  if (!schemaPath) {
    throw new Error('Could not find database schema.sql');
  }

  const schemaSql = fs.readFileSync(schemaPath, 'utf8');

  await pool.query(schemaSql);
}

if (require.main === module) {
  migrateDatabase()
    .then(async () => {
      await pool.end();
      console.log('Database migrated successfully');
    })
    .catch(async (error) => {
      await pool.end();
      console.error(error);
      process.exit(1);
    });
}
