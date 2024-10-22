import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Headers,
  Query,
  Delete,
  Param,
} from '@nestjs/common';

import {
  CreateProductRequest,
  GetProductsRequest,
  PaginatedResponse,
  Role,
  UpdateProductRequest,
} from '@marketplace/domain';

import { Roles } from '@/auth/roles.decorator';
import { BasicResponse } from '@/core/responses/basic.response';
import { ProductResponse } from './responses/product.response';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Roles([Role.User])
  async create(
    @Headers('user-id') userId: string,
    @Body() createProductRequest: CreateProductRequest,
  ): Promise<ProductResponse> {
    const product = await this.productsService.create(
      userId,
      createProductRequest,
    );
    return ProductResponse.fromProductEntity(product);
  }

  @Get()
  @Roles([Role.User, Role.Admin])
  async getProducts(
    @Headers('user-id') userId: string,
    @Query() getProductsRequest: GetProductsRequest,
  ): Promise<PaginatedResponse<ProductResponse>> {
    const response = await this.productsService.getProducts(
      userId,
      getProductsRequest,
    );
    return {
      ...response,
      items: response.items.map((i) => ProductResponse.fromProductEntity(i)),
    };
  }

  @Delete(':productId')
  @Roles([Role.User, Role.Admin])
  async deleteProduct(
    @Headers('user-id') userId: string,
    @Param('productId') productId: string,
  ): Promise<BasicResponse> {
    await this.productsService.deleteProduct(userId, productId);
    return BasicResponse.success();
  }

  @Put(':productId')
  @Roles([Role.User, Role.Admin])
  async updateProduct(
    @Headers('user-id') userId: string,
    @Param('productId') productId: string,
    @Body() updateProductRequest: UpdateProductRequest,
  ): Promise<ProductResponse> {
    const product = await this.productsService.updateProduct(
      userId,
      productId,
      updateProductRequest,
    );
    return ProductResponse.fromProductEntity(product);
  }
}
