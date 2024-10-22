import { Role, UserEntity } from '@marketplace/domain';
export declare class UserResponse {
    email: string;
    name: string;
    role: Role;
    static fromUserEntity(user: UserEntity): UserResponse;
}
