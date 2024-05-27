import { Role } from "@domain";

export interface IJwtService {
  generate(role: Role, userId: string): string;
  parse(token: string): any;
}
