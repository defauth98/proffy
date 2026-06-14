import { Knex } from 'knex';

import bcrypt from 'bcrypt';
import { saltRounds } from '../../controllers/AuthController';

export async function seed(knex: Knex): Promise<void> {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync('proffy', salt);

  await knex('users').insert([
    {
      name: 'Savannah',
      surname: 'Soto',
      email: 'savannah.soto@example.com',
      avatar: 'https://randomuser.me/api/portraits/women/73.jpg',
      password: hash,
      whatsapp: '(546)-516-2820',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
    },
    {
      name: 'Harper',
      surname: 'Morales',
      email: 'harper.morales@example.com',
      avatar: 'https://randomuser.me/api/portraits/women/14.jpg',
      password: hash,
      whatsapp: '(689)-494-3871',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
    },
    {
      name: 'Willard',
      surname: 'Johnston',
      email: 'willard.johnston@example.com',
      avatar: 'https://randomuser.me/api/portraits/men/31.jpg',
      password: hash,
      whatsapp: '(439)-702-7559',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
    },
    {
      name: 'Juan',
      surname: 'Rice',
      email: 'juan.rice@example.com',
      avatar: 'https://randomuser.me/api/portraits/men/27.jpg',
      password: hash,
      whatsapp: '(045)-956-5851',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
    },
  ]);
}
