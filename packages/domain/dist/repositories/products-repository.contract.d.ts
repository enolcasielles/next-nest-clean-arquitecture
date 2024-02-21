import { type CreateProductDto } from '../requests/create-product.dto';
import { type GetProductsDto } from '../requests/get-products.dto';
import { type ProductEntity } from '../entities/product.entity';
import { type PaginatedResponse } from '../responses/paginated.response';
export interface IProductsRepository {
    create: (userId: string, product: CreateProductDto) => Promise<ProductEntity>;
    get: (query: GetProductsDto) => Promise<PaginatedResponse<ProductEntity>>;
    getById: (id: string) => Promise<ProductEntity>;
    delete: (id: string) => Promise<boolean>;
}
//# sourceMappingURL=products-repository.contract.d.ts.map