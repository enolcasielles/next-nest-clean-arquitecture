import type { Config } from 'drizzle-kit'

export default {
  schema: './src/schemas/index.ts',
  out: './drizzle'
} satisfies Config
