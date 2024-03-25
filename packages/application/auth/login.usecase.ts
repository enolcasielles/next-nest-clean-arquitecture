import {
  CustomError,
  Either,
  IUsersRepository,
  Role,
  UserEntity,
  makeLeft,
  makeRight,
} from "@domain";
import { UseCase } from "../core/usecase";
import { z } from "zod";
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

export class LoginUseCase implements UseCase<Request, Context, Response> {
  async execute(
    context: Context,
    request: Request,
  ): Promise<Either<CustomError, Response>> {
    const _jwtService = context.jwtService ?? new JwtService();
    const _passwordService = context.passwordService ?? new PasswordsService();
    try {
      const validationError = this.validate(request);
      if (validationError !== null) {
        return makeLeft(validationError);
      }
      const user = await context.usersRepository.getByEmail(request.email);
      if (user === null) {
        const error = new CustomError("USER_NOT_FOUND");
        error.addError("Invalid data");
        return makeLeft(error);
      }
      const validPassword = await _passwordService.verifyHash(
        user.password,
        request.password,
      );
      if (!validPassword) {
        const error = new CustomError("USER_NOT_FOUND");
        error.addError("Invalid data");
        return makeLeft(error);
      }
      return makeRight({
        user,
        token: _jwtService.generate(Role.User, user.id),
      });
    } catch (error) {
      console.log(error);
      if (error instanceof CustomError) {
        return makeLeft(error);
      }
      const genericError = new CustomError("GENERIC_ERROR");
      genericError.setPayload(error);
      return makeLeft(genericError);
    }
  }

  private validate(data: Request): CustomError {
    const schema = z.object({
      email: z.string().email(),
      password: z.string().min(4),
    });
    return validateSchema(schema, data);
  }
}
