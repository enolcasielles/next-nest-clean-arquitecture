import { Role } from "@marketplace/domain";

export interface IJwtService {
  generate(role: Role, userId: string): string;
  parse(token: string): any;
}
