require('dotenv/config');

const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const pool = new Pool(
  process.env.DATABASE_URL
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
      }
);

const user = {
  name: process.env.TEST_USER_NAME || 'Usuário',
  surname: process.env.TEST_USER_SURNAME || 'Teste',
  email: process.env.TEST_USER_EMAIL || 'teste@proffy.com',
  password: process.env.TEST_USER_PASSWORD || '123456',
  avatar:
    process.env.TEST_USER_AVATAR ||
    'https://randomuser.me/api/portraits/lego/1.jpg',
  whatsapp: process.env.TEST_USER_WHATSAPP || '(11) 99999-9999',
  bio: process.env.TEST_USER_BIO || 'Usuário de teste.',
};

async function main() {
  const passwordHash = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));

  const payload = [
    user.name,
    user.surname,
    user.email,
    passwordHash,
    user.avatar,
    user.whatsapp,
    user.bio,
  ];

  const existingUser = await pool.query('SELECT id FROM users WHERE email = $1 LIMIT 1', [
    user.email,
  ]);

  if (existingUser.rows[0]) {
    await pool.query(
      `UPDATE users
       SET name = $1, surname = $2, email = $3, password = $4, avatar = $5, whatsapp = $6, bio = $7
       WHERE email = $3`,
      payload
    );
    console.log('Usuário de teste atualizado.');
  } else {
    await pool.query(
      `INSERT INTO users (name, surname, email, password, avatar, whatsapp, bio)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      payload
    );
    console.log('Usuário de teste criado.');
  }

  console.log(`Email: ${user.email}`);
  console.log(`Senha: ${user.password}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
