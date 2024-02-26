import { type CreateProductRequest, type GetProductsRequest, type IProductsRepository, type ProductEntity } from '@domain'
import { type PaginatedResponse } from '../../../domain/responses/paginated.response'

export class ProductsRepository implements IProductsRepository {
  async create (userId: string, product: CreateProductRequest): Promise<ProductEntity> {
    return null
  }

  async get (query: GetProductsRequest): Promise<PaginatedResponse<ProductEntity>> {
    return null
  }

  async getById (id: string): Promise<ProductEntity> {
    return null
  }

  async delete (id: string): Promise<boolean> {
    return null
  }
}
