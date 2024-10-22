import { CreateProductUseCase, DeleteProductUseCase, GetProductsUseCase, UpdateProductUseCase } from '@marketplace/application';
import { CreateProductRequest, GetProductsRequest, ProductEntity, UpdateProductRequest } from '@marketplace/domain';
export declare class ProductsService {
    private createProductUseCase;
    private getProductsUseCase;
    private deleteProductUseCase;
    private updateProductUseCase;
    constructor(createProductUseCase: CreateProductUseCase, getProductsUseCase: GetProductsUseCase, deleteProductUseCase: DeleteProductUseCase, updateProductUseCase: UpdateProductUseCase);
    create(userId: string, createProductDto: CreateProductRequest): Promise<ProductEntity>;
    getProducts(userId: string, query: GetProductsRequest): Promise<any>;
    deleteProduct(userId: string, productId: string): Promise<void>;
    updateProduct(userId: string, productId: string, updateProductDto: UpdateProductRequest): Promise<ProductEntity>;
}
