import { type ProductCategory } from '../entities/product.entity'
import { type GetPaginatedDto } from './get-paginated.request'

export interface GetProductsRequest extends GetPaginatedDto {
  titleSearch?: string
  category?: ProductCategory
}
