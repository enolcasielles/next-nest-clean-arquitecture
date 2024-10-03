import { z } from "zod";
import {
  type IProductsRepository,
  type UpdateProductRequest,
  type ProductEntity,
  CustomError,
  CommonErrors,
  buildCommonError,
  IUsersRepository,
  Role,
} from "@domain";
import { UseCase } from "../core/usecase";
import { validateSchema } from "../core/validate-schema";

interface Context {
  productsRepository: IProductsRepository;
  usersRepository: IUsersRepository;
}

interface Request {
  userId: string;
  productId: string;
  product: UpdateProductRequest;
}

export class UpdateProductUseCase extends UseCase<
  Request,
  Context,
  ProductEntity
> {
  constructor(context: Context) {
    super(context);
  }

  protected async run(request: Request): Promise<ProductEntity> {
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
    const updatedProduct = await this.context.productsRepository.update(
      request.productId,
      request.product,
    );
    return updatedProduct;
  }

  protected validate(request: Request): CustomError {
    const schema = z.object({
      userId: z.string(),
      productId: z.string(),
      product: z.object({
        title: z.string(),
        price: z.number(),
        description: z
          .string()
          .max(50, "La descripción no puede tener más de 50 caracteres"),
        category: z.string(),
      }),
    });
    return validateSchema(schema, request);
  }
}
