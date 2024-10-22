import { type CreateProductRequest, type GetProductsRequest, PaginatedResponse, type UpdateProductRequest } from '@marketplace/domain';
import { BasicResponse } from '@/core/responses/basic.response';
import { ProductResponse } from './responses/product.response';
import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(userId: string, createProductRequest: CreateProductRequest): Promise<ProductResponse>;
    getProducts(userId: string, getProductsRequest: GetProductsRequest): Promise<PaginatedResponse<ProductResponse>>;
    deleteProduct(userId: string, productId: string): Promise<BasicResponse>;
    updateProduct(userId: string, productId: string, updateProductRequest: UpdateProductRequest): Promise<ProductResponse>;
}
