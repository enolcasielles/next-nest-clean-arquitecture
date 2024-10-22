import { CustomError, Role } from "@marketplace/domain";
import { JwtService } from "./services/jwt/jwt.service";
import { IJwtService } from "./services/jwt/jwt.service.contract";
import { UseCase } from "../core/usecase";

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
