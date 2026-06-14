import { Knex } from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('favorites', (table) => {
    table.increments('id').primary();

    table
      .integer('favorite_user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    table
      .integer('favorited_class_id')
      .notNullable()
      .references('id')
      .inTable('classes')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('favorites');
}
