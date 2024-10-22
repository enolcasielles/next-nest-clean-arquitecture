import * as bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

export class PasswordsService {
  async hash(plainPassword: string): Promise<string> {
    return await bcrypt.hash(plainPassword, SALT_ROUNDS);
  }

  async verifyHash(
    hashPassword: string,
    plainPassword: string,
  ): Promise<boolean> {
    const result = await bcrypt.compare(plainPassword, hashPassword);
    return result;
  }
}
