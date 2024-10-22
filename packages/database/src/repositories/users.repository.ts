import {
  Role,
  type IUsersRepository,
  type UserEntity,
} from "@marketplace/domain";
import db from "../db";
import { userDbToEntity } from "../mappers/users.mappers";

export class UsersRepository implements IUsersRepository {
  async getById(id: string): Promise<UserEntity> {
    const user = await db.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!user) return null;
    return userDbToEntity(user);
  }

  async getByEmail(email: string): Promise<UserEntity> {
    const user = await db.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) return null;
    return userDbToEntity(user);
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
      id: user.id.toString(),
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      name: user.name,
      role: user.role as Role,
    };
  }
}
