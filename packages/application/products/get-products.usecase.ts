import {
  CommonErrors,
  CustomError,
  GetProductsRequest,
  IProductsRepository,
  IUsersRepository,
  ProductEntity,
  Role,
  buildCommonError,
  type PaginatedResponse,
} from "@domain";
import { UseCase } from "../core/usecase";

interface Context {
  usersRepository: IUsersRepository;
  productsRepository: IProductsRepository;
}

interface Request {
  userId: string;
  query: GetProductsRequest;
}

export class GetProductsUseCase extends UseCase<
  Request,
  Context,
  PaginatedResponse<ProductEntity>
> {
  constructor(context: Context) {
    super(context);
  }

  protected async run(
    request: Request,
  ): Promise<PaginatedResponse<ProductEntity>> {
    const user = await this.context.usersRepository.getById(request.userId);
    if (!user) {
      throw buildCommonError(CommonErrors.USER_NOT_FOUND, 404);
    }
    if (user.role === Role.Admin) {
      return await this.context.productsRepository.getAll(request.query);
    }
    return await this.context.productsRepository.get(
      request.userId,
      request.query,
    );
  }

  protected validate(): CustomError {
    return null;
  }
}
