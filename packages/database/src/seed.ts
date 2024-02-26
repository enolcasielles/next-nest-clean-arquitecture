import db from './db'
import { user } from './schemas'

export const runSeed = async (): Promise<void> => {
  try {
    console.log('Seeding database...')
    await db.delete(user)
    await db.insert(user).values({
      name: 'Enol Casielles',
      email: 'enolcasielles@gmail.com',
      password: '1234'
    })
    console.log('Database seeded')
  } catch (e) {
    console.log('Error: ', e)
  }
}
