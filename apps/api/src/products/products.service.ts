import { Injectable } from '@nestjs/common';

import {
  CreateProductUseCase,
  DeleteProductUseCase,
  GetProductsUseCase,
} from '@application';
import {
  CreateProductRequest,
  GetProductsRequest,
  ProductEntity,
} from '@domain';

@Injectable()
export class ProductsService {
  constructor(
    private createProductUseCase: CreateProductUseCase,
    private getProductsUseCase: GetProductsUseCase,
    private deleteProductUseCase: DeleteProductUseCase,
  ) {}

  async create(
    userId: string,
    createProductDto: CreateProductRequest,
  ): Promise<ProductEntity> {
    const response = await this.createProductUseCase.execute({
      userId: userId,
      product: createProductDto,
    });
    return response;
  }

  async getProducts(userId: string, query: GetProductsRequest) {
    const response = await this.getProductsUseCase.execute({
      userId,
      query,
    });
    return response;
  }

  async deleteProduct(userId: string, productId: string) {
    await this.deleteProductUseCase.execute({
      userId,
      productId,
    });
  }
}
