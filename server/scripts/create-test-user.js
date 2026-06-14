require('dotenv/config');

const knex = require('knex');
const bcrypt = require('bcryptjs');

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

const db = knex({
  client: 'pg',
  connection,
});

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
  const existingUser = await db('users').where({ email: user.email }).first();

  const payload = {
    name: user.name,
    surname: user.surname,
    email: user.email,
    password: passwordHash,
    avatar: user.avatar,
    whatsapp: user.whatsapp,
    bio: user.bio,
  };

  if (existingUser) {
    await db('users').where({ email: user.email }).update(payload);
    console.log('Usuário de teste atualizado.');
  } else {
    await db('users').insert(payload);
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
    await db.destroy();
  });
