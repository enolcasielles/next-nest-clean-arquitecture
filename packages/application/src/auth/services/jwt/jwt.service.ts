import * as jwt from "jsonwebtoken";

import { Role } from "@marketplace/domain";

import { IJwtService } from "./jwt.service.contract";

// TODO(enol): Llevar a una varible de entorno
const SECRET_KEY = "3420343efgh4583409fgheas340";

export class JwtService implements IJwtService {
  generate(role: Role, userId: string) {
    return jwt.sign({ userId, role }, SECRET_KEY, {
      algorithm: "HS256",
    });
  }
  parse(token: string) {
    try {
      return jwt.verify(token, SECRET_KEY);
    } catch (e) {
      return null;
    }
  }
}
