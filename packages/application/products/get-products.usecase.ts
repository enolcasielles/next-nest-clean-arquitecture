import { type ProductEntity } from "../../domain/entities/product.entity";
import {
  type Either,
  CustomError,
  makeLeft,
  makeRight,
} from "../../domain/errors";
import { type IProductsRepository } from "../../domain/repositories/products.repository.contract";
import { type GetProductsRequest } from "../../domain/requests/get-products.request";
import { type PaginatedResponse } from "@domain";
import { type UseCase } from "../core/usecase";

interface Context {
  productsRepository: IProductsRepository;
}

interface Request {
  userId: string;
  query: GetProductsRequest;
}

export class GetProductsUseCase
  implements UseCase<Request, Context, PaginatedResponse<ProductEntity>>
{
  async execute(
    context: Context,
    request: Request,
  ): Promise<Either<CustomError, PaginatedResponse<ProductEntity>>> {
    try {
      const products = await context.productsRepository.get(
        request.userId,
        request.query,
      );
      return makeRight(products);
    } catch (error) {
      console.log("error", error);
      if (error instanceof CustomError) {
        return makeLeft(error);
      }
      const genericError = new CustomError("GENERIC_ERROR");
      genericError.setPayload(error);
      return makeLeft(genericError);
    }
  }
}
