import { Role } from "@domain";

export interface IJwtService {
  generate(role: Role, userId: number): string;
  parse(token: string): any;
}
