import { serial, text, timestamp, pgTable } from 'drizzle-orm/pg-core'

export const user = pgTable('user', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
})

export type User = typeof user.$inferSelect
