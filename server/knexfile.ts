import path from 'path';
import 'dotenv/config';

const connection = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl:
        process.env.NODE_ENV === 'production'
          ? { rejectUnauthorized: false }
          : undefined,
    }
  : {
      host: process.env.PGHOST,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
      port: Number(process.env.PGPORT),
    };

module.exports = {
  client: 'pg',
  connection,
  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
  },
  seeds: {
    directory: path.resolve(__dirname, 'src', 'database', 'seeds'),
  },
  useNullAsDefault: true,
};
