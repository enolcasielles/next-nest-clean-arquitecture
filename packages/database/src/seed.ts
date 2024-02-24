import db from './db'
import { user } from './schemas'

const main = async (): Promise<void> => {
  console.log('Seeding database...')
  db.delete(user)
  db.insert(user).values({
    name: 'Enol Casielles',
    email: 'enolcasielles@gmail.com',
    password: '1234'
  })
}

main()
