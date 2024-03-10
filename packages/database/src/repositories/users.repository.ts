import { type IUsersRepository, type UserEntity } from "@domain";
import db from "../db";

export class UsersRepository implements IUsersRepository {
  async getByEmail(): Promise<UserEntity> {
    await db.query.user.findFirst();
    return null;
  }
}
