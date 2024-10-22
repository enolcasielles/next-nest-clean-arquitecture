import {
  CustomError,
  IUsersRepository,
  Role,
  UserEntity,
} from "@marketplace/domain";
import { UseCase } from "../core/usecase";
import { z } from "zod";
import { validateSchema } from "../core/validate-schema";
import { IPasswordsService } from "./services/passwords/passwords.service.contract";
import { PasswordsService } from "./services/passwords/passwords.service";
import { IJwtService } from "./services/jwt/jwt.service.contract";
import { JwtService } from "./services/jwt/jwt.service";

interface Context {
  usersRepository: IUsersRepository;
  jwtService?: IJwtService;
  passwordService?: IPasswordsService;
}

interface Request {
  email: string;
  name: string;
  password: string;
}

interface Response {
  user: UserEntity;
  token: string;
}

export class RegisterUserUseCase extends UseCase<Request, Context, Response> {
  constructor(context: Context) {
    super(context);
  }

  protected async run(request: Request): Promise<Response> {
    const _jwtService = this.context.jwtService ?? new JwtService();
    const _passwordService =
      this.context.passwordService ?? new PasswordsService();
    const user = await this.context.usersRepository.createUser(
      request.email,
      request.name,
      await _passwordService.hash(request.password),
    );
    return {
      user,
      token: _jwtService.generate(Role.User, user.id),
    };
  }

  protected validate(data: Request): CustomError {
    const schema = z.object({
      email: z.string().email(),
      name: z.string(),
      password: z.string().min(4),
    });
    return validateSchema(schema, data);
  }
}
