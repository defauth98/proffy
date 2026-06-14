import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Inserts seed entries
  await knex('classes').insert([
    { subject: 'Matemática', cost: 100, user_id: 1 },
    { subject: 'Geografia', cost: 100, user_id: 2 },
    { subject: 'Artes', cost: 100, user_id: 3 },
    { subject: 'Português', cost: 100, user_id: 4 },
  ]);

  await knex('class_schedule').insert([
    { week_day: 1, from: 420, to: 1080, class_id: 1 },
    { week_day: 2, from: 420, to: 1080, class_id: 1 },
    { week_day: 3, from: 420, to: 1080, class_id: 2 },
    { week_day: 4, from: 420, to: 1080, class_id: 2 },
    { week_day: 5, from: 420, to: 1080, class_id: 3 },
    { week_day: 1, from: 420, to: 1080, class_id: 3 },
    { week_day: 2, from: 420, to: 1080, class_id: 4 },
    { week_day: 3, from: 420, to: 1080, class_id: 4 },
  ]);
}
