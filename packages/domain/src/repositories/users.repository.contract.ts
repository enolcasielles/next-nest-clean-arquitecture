import { type UserEntity } from "../entities/user.entity";

export interface IUsersRepository {
  getById: (id: string) => Promise<UserEntity>;
  getByEmail: (email: string) => Promise<UserEntity>;
  createUser: (
    email: string,
    name: string,
    password: string,
  ) => Promise<UserEntity>;
}
