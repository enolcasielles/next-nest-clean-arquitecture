import { type ProductCategory } from '../entities/Product';
import { type GetPaginatedDto } from './get-paginated.dto';
export interface GetProductsDto extends GetPaginatedDto {
    titleSearch?: string;
    category?: ProductCategory;
}
//# sourceMappingURL=get-products.dto.d.ts.map