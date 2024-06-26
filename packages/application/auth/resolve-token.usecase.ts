import { CustomError, Role } from "@domain";
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
  role: Role;
}

export class ResolveTokenUseCase extends UseCase<Request, Context, Response> {
  constructor(context: Context) {
    super(context);
  }

  protected async run(request: Request): Promise<Response> {
    const _jwtService = this.context?.jwtService ?? new JwtService();
    const { userId, role } = _jwtService.parse(request.token);
    return { userId, role };
  }

  protected validate(): CustomError {
    return null;
  }
}
