import { drizzle } from 'drizzle-orm/neon-http'
import { migrate } from 'drizzle-orm/neon-http/migrator'
import { neon } from '@neondatabase/serverless'

export const runMigrations = async (): Promise<void> => {
  // const connectionString = process.env.DATABASE_CONNECTION
  const connectionString = 'postgresql://enolcasielles:SZd0Hp4vkIsF@ep-cold-rice-a2hhsw6k.eu-central-1.aws.neon.tech/test?sslmode=require'
  const sql = neon(connectionString)
  const db = drizzle(sql)
  await migrate(db, { migrationsFolder: 'drizzle' })
}

runMigrations()
