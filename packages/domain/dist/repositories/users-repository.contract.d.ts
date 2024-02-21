import { type UserEntity } from '../entities/User';
export interface IUsersRepository {
    getByEmail: (email: string) => Promise<UserEntity>;
}
//# sourceMappingURL=users-repository.contract.d.ts.map