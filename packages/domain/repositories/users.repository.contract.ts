import { type UserEntity } from "../entities/user.entity";

export interface IUsersRepository {
  getByEmail: (email: string) => Promise<UserEntity>;
  createUser: (
    email: string,
    name: string,
    password: string,
  ) => Promise<UserEntity>;
}
