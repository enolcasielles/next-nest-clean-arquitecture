import {
  CustomError,
  IProductsRepository,
  CommonErrors,
  buildCommonError,
  IUsersRepository,
  Role,
} from "@marketplace/domain";
import { UseCase } from "../core/usecase";

interface Request {
  userId: string;
  productId: string;
}

interface Context {
  usersRepository: IUsersRepository;
  productsRepository: IProductsRepository;
}

export class DeleteProductUseCase extends UseCase<Request, Context, null> {
  constructor(context: Context) {
    super(context);
  }

  protected async run(request: Request): Promise<null> {
    const user = await this.context.usersRepository.getById(request.userId);
    if (!user) {
      throw buildCommonError(CommonErrors.USER_NOT_FOUND, 404);
    }
    const product = await this.context.productsRepository.getById(
      request.productId,
    );
    if (!product) {
      throw buildCommonError(CommonErrors.PRODUCT_NOT_FOUND, 404);
    }
    if (user.role !== Role.Admin && product.userId !== user.id) {
      throw buildCommonError(CommonErrors.UNAUTHORIZED, 403);
    }
    await this.context.productsRepository.delete(request.productId);
    return null;
  }

  protected validate(): CustomError {
    return null;
  }
}
