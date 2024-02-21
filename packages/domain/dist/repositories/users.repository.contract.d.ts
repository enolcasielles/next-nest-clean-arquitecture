import { type UserEntity } from '../entities/user.entity';
export interface IUsersRepository {
    getByEmail: (email: string) => Promise<UserEntity>;
}
//# sourceMappingURL=users.repository.contract.d.ts.map