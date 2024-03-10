import { type CreateProductRequest } from "../requests/create-product.request";
import { type GetProductsRequest } from "../requests/get-products.request";
import { type ProductEntity } from "../entities/product.entity";
import { type PaginatedResponse } from "../responses/paginated.response";

export interface IProductsRepository {
  create: (
    userId: string,
    product: CreateProductRequest,
  ) => Promise<ProductEntity>;
  get: (query: GetProductsRequest) => Promise<PaginatedResponse<ProductEntity>>;
  getById: (id: string) => Promise<ProductEntity>;
  delete: (id: string) => Promise<boolean>;
}
