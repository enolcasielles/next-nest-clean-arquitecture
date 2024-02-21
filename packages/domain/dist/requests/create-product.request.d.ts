import { type ProductCategory } from '../entities/product.entity';
export interface CreateProductRequest {
    title: string;
    price: number;
    description: string;
    category: ProductCategory;
}
//# sourceMappingURL=create-product.request.d.ts.map