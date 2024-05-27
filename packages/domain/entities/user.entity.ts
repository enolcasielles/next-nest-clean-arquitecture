import { Role } from "../enums/roles.enum";
import { type BaseEntity } from "./base.entity";

export interface UserEntity extends BaseEntity {
  email: string;
  password: string;
  name: string;
  role: Role;
}
