import { Module } from '@nestjs/common';

import {
  CreateProductUseCase,
  DeleteProductUseCase,
  GetProductsUseCase,
  UpdateProductUseCase,
} from '@marketplace/application';

import { DI } from '@/core/di/di';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService,
    {
      provide: CreateProductUseCase,
      useFactory: () =>
        new CreateProductUseCase({
          productsRepository: DI.productsRepository,
        }),
    },
    {
      provide: GetProductsUseCase,
      useFactory: () =>
        new GetProductsUseCase({
          productsRepository: DI.productsRepository,
          usersRepository: DI.usersRepository,
        }),
    },
    {
      provide: DeleteProductUseCase,
      useFactory: () =>
        new DeleteProductUseCase({
          productsRepository: DI.productsRepository,
          usersRepository: DI.usersRepository,
        }),
    },
    {
      provide: UpdateProductUseCase,
      useFactory: () =>
        new UpdateProductUseCase({
          productsRepository: DI.productsRepository,
          usersRepository: DI.usersRepository,
        }),
    },
  ],
})
export class ProductsModule {}
