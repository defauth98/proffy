import knex from 'knex';
import 'dotenv/config';

const db = knex({
  client: 'pg',
  connection: {
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: Number(process.env.PGPORT),
  },

  useNullAsDefault: true,
});

export default db;
