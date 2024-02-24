import { type IUsersRepository, type UserEntity } from '@marketplace/domain'
import db from '../db'

export class UsersRepository implements IUsersRepository {
  async getByEmail (): Promise<UserEntity> {
    await db.query.user.findFirst()
    return null
  }
}
