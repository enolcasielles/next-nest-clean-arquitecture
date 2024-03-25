import {
  CustomError,
  Either,
  IUsersRepository,
  UserEntity,
  makeLeft,
  makeRight,
} from "@domain";
import { UseCase } from "../core/usecase";
import { z } from "zod";
import { validateSchema } from "../core/validate-schema";
import { IPasswordsService } from "./services/passwords/passwords.service.contract";
import { PasswordsService } from "./services/passwords/passwords.service";

interface Context {
  usersRepository: IUsersRepository;
  passwordService?: IPasswordsService;
}

interface Request {
  email: string;
  name: string;
  password: string;
}

interface Response {
  user: UserEntity;
}

export class RegisterUserUseCase
  implements UseCase<Request, Context, Response>
{
  async execute(
    context: Context,
    request: Request,
  ): Promise<Either<CustomError, Response>> {
    const _passwordService = context.passwordService ?? new PasswordsService();
    try {
      const validationError = this.validate(request);
      if (validationError !== null) {
        return makeLeft(validationError);
      }
      const user = await context.usersRepository.createUser(
        request.email,
        request.name,
        await _passwordService.hash(request.password),
      );
      return makeRight({
        user,
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
      name: z.string(),
      password: z.string().min(4),
    });
    return validateSchema(schema, data);
  }
}
