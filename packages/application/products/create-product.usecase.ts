import { z } from "zod";
import {
  type IProductsRepository,
  type CreateProductRequest,
  type ProductEntity,
  CustomError,
} from "@domain";
import { UseCase } from "../core/usecase";
import { validateSchema } from "../core/validate-schema";

interface Context {
  productsRepository: IProductsRepository;
}

interface Request {
  userId: string;
  product: CreateProductRequest;
}

export class CreateProductUseCase extends UseCase<
  Request,
  Context,
  ProductEntity
> {
  constructor(context: Context) {
    super(context);
  }

  protected async run(request: Request): Promise<ProductEntity> {
    const product = await this.context.productsRepository.create(
      request.userId,
      request.product,
    );
    return product;
  }

  protected validate(request: Request): CustomError {
    const schema = z.object({
      userId: z.string(),
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
