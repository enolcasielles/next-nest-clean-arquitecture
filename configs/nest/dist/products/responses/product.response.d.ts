import { ProductCategory, ProductEntity } from '@marketplace/domain';
export declare class ProductResponse {
    title: string;
    price: number;
    description: string;
    category: ProductCategory;
    static fromProductEntity(product: ProductEntity): ProductResponse;
}
