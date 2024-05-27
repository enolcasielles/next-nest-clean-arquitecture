import { Module } from '@nestjs/common';

import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ProductsModule, AuthModule],
})
export class AppModule {}
