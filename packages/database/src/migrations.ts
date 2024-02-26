import { drizzle } from 'drizzle-orm/neon-http'
import { migrate } from 'drizzle-orm/neon-http/migrator'
import { neon } from '@neondatabase/serverless'

export const runMigrations = async (): Promise<void> => {
  const connectionString = process.env.DATABASE_CONNECTION
  const sql = neon(connectionString)
  const db = drizzle(sql)
  await migrate(db, { migrationsFolder: 'drizzle' })
}
