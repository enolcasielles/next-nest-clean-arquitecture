import { type IUsersRepository, type UserEntity } from "@domain";
import db from "../db";

export class UsersRepository implements IUsersRepository {
  async getByEmail(email: string): Promise<UserEntity> {
    console.log(email);
    const user = await db.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!user) return null;
    return {
      id: user.id,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      name: user.name,
    };
  }

  async createUser(
    email: string,
    name: string,
    password: string,
  ): Promise<UserEntity> {
    const user = await db.user.create({
      data: {
        email,
        password,
        name,
      },
    });
    return {
      id: user.id,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      name: user.name,
    };
  }
}
