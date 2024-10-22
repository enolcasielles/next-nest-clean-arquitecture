import { z } from "zod";

import {
  CommonErrors,
  CustomError,
  IUsersRepository,
  UserEntity,
  buildCommonError,
} from "@marketplace/domain";

import { UseCase } from "../core/usecase";
import { validateSchema } from "../core/validate-schema";
import { IPasswordsService } from "./services/passwords/passwords.service.contract";
import { IJwtService } from "./services/jwt/jwt.service.contract";
import { JwtService } from "./services/jwt/jwt.service";
import { PasswordsService } from "./services/passwords/passwords.service";

interface Context {
  usersRepository: IUsersRepository;
  jwtService?: IJwtService;
  passwordService?: IPasswordsService;
}

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: UserEntity;
  token: string;
}

export class LoginUseCase extends UseCase<Request, Context, Response> {
  constructor(context: Context) {
    super(context);
  }

  protected async run(request: Request): Promise<Response> {
    const _jwtService = this.context.jwtService ?? new JwtService();
    const _passwordService =
      this.context.passwordService ?? new PasswordsService();
    const user = await this.context.usersRepository.getByEmail(request.email);
    if (user === null) {
      throw buildCommonError(CommonErrors.USER_NOT_FOUND, 404);
    }
    const validPassword = await _passwordService.verifyHash(
      user.password,
      request.password,
    );
    if (!validPassword) {
      throw buildCommonError(CommonErrors.USER_NOT_FOUND, 404);
    }
    return {
      user,
      token: _jwtService.generate(user.role, user.id),
    };
  }

  protected validate(data: Request): CustomError {
    const schema = z.object({
      email: z.string().email(),
      password: z.string().min(4),
    });
    return validateSchema(schema, data);
  }
}
