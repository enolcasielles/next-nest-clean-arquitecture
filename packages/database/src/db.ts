import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'

import * as schema from './schemas/index'

const sql = neon(process.env.DATABASE_CONNECTION)
const db = drizzle(sql, {
  schema
})

export default db
