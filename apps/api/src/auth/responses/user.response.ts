import { Role, UserEntity } from '@marketplace/domain';

export class UserResponse {
  email: string;
  name: string;
  role: Role;

  static fromUserEntity(user: UserEntity): UserResponse {
    return {
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }
}
