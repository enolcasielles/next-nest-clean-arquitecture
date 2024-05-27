import { NestFactory, Reflector } from '@nestjs/core';

import { ResolveTokenUseCase } from '@application';

import { AppModule } from './app.module';
import { RolesGuard } from './auth/role.guard';
import { ErrorFilter } from './error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);
  const resolveTokenUseCase = app.get(ResolveTokenUseCase);
  app.useGlobalGuards(new RolesGuard(reflector, resolveTokenUseCase));
  app.useGlobalFilters(new ErrorFilter());
  await app.listen(3002);
}

bootstrap();
