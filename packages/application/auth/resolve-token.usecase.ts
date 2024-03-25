import { CustomError, Either, makeLeft, makeRight } from "@domain";
import { UseCase } from "../core/usecase";
import { JwtService } from "./services/jwt/jwt.service";
import { IJwtService } from "./services/jwt/jwt.service.contract";

interface Context {
  jwtService?: IJwtService;
}

interface Request {
  token: string;
}

interface Response {
  userId: string;
}

export class ResolveTokenUseCase
  implements UseCase<Request, Context, Response>
{
  async execute(
    context: Context,
    request: Request,
  ): Promise<Either<CustomError, Response>> {
    const _jwtService = context?.jwtService ?? new JwtService();
    try {
      const userId = _jwtService.parse(request.token);
      return makeRight({ userId });
    } catch (error) {
      if (error instanceof CustomError) {
        return makeLeft(error);
      }
      const genericError = new CustomError("GENERIC_ERROR");
      genericError.setPayload(error);
      return makeLeft(genericError);
    }
  }
}
