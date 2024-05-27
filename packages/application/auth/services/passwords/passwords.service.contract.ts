export interface IPasswordsService {
  hash(plainPassword: string): Promise<string>;
  verifyHash(hashPassword: string, plainPassword: string): Promise<boolean>;
}
