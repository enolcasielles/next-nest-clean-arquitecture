import { type CreateProductRequest } from "../requests/create-product.request";
import { type GetProductsRequest } from "../requests/get-products.request";
import { type ProductEntity } from "../entities/product.entity";
import { type PaginatedResponse } from "../responses/paginated.response";
import { UpdateProductRequest } from "../requests/update-product.request";

export interface IProductsRepository {
  create: (
    userId: string,
    product: CreateProductRequest,
  ) => Promise<ProductEntity>;
  getAll: (
    query: GetProductsRequest,
  ) => Promise<PaginatedResponse<ProductEntity>>;
  get: (
    userId: string,
    query: GetProductsRequest,
  ) => Promise<PaginatedResponse<ProductEntity>>;
  getById: (id: string) => Promise<ProductEntity>;
  delete: (id: string) => Promise<boolean>;
  update: (id: string, product: UpdateProductRequest) => Promise<ProductEntity>;
}
