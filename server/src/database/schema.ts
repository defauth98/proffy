import { relations } from 'drizzle-orm';
import {
  integer,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  surname: varchar('surname').notNull(),
  email: varchar('email').notNull(),
  password: varchar('password').notNull(),
  avatar: varchar('avatar'),
  whatsapp: varchar('whatsapp'),
  bio: text('bio'),
  passwordResetToken: varchar('passwordResetToken'),
  passwordResetExpires: timestamp('passwordResetExpires'),
});

export const classes = pgTable('classes', {
  id: serial('id').primaryKey(),
  subject: varchar('subject').notNull(),
  cost: numeric('cost').notNull(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
});

export const classSchedule = pgTable('class_schedule', {
  id: serial('id').primaryKey(),
  weekDay: integer('week_day').notNull(),
  from: integer('from').notNull(),
  to: integer('to').notNull(),
  classId: integer('class_id')
    .notNull()
    .references(() => classes.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const connections = pgTable('connections', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const favorites = pgTable('favorites', {
  id: serial('id').primaryKey(),
  favoriteUserId: integer('favorite_user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  favoritedClassId: integer('favorited_class_id')
    .notNull()
    .references(() => classes.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
});

export const usersRelations = relations(users, ({ many }) => ({
  classes: many(classes),
  connections: many(connections),
  favorites: many(favorites),
}));

export const classesRelations = relations(classes, ({ one, many }) => ({
  user: one(users, {
    fields: [classes.userId],
    references: [users.id],
  }),
  schedule: many(classSchedule),
  favorites: many(favorites),
}));

export const classScheduleRelations = relations(classSchedule, ({ one }) => ({
  class: one(classes, {
    fields: [classSchedule.classId],
    references: [classes.id],
  }),
}));

export const connectionsRelations = relations(connections, ({ one }) => ({
  user: one(users, {
    fields: [connections.userId],
    references: [users.id],
  }),
}));

export const favoritesRelations = relations(favorites, ({ one }) => ({
  favoriteUser: one(users, {
    fields: [favorites.favoriteUserId],
    references: [users.id],
  }),
  favoritedClass: one(classes, {
    fields: [favorites.favoritedClassId],
    references: [classes.id],
  }),
}));
