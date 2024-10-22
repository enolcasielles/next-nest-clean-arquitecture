import { Role, UserEntity } from "@marketplace/domain";
import { User } from "@prisma/client";

export const userDbToEntity = (dbUser: User): UserEntity => {
  return {
    id: dbUser.id.toString(),
    email: dbUser.email,
    password: dbUser.password,
    createdAt: dbUser.createdAt,
    updatedAt: dbUser.updatedAt,
    name: dbUser.name,
    role: dbUser.role as Role,
  };
};
