import * as jwt from "jsonwebtoken";
import { IJwtService } from "./jwt.service.contract";
import { Role } from "@domain";

const SECRET_KEY = "dkfjdksfsa";

export class JwtService implements IJwtService {
  generate(role: Role, userId: number) {
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
