import { Module } from '@nestjs/common';

import {
  LoginUseCase,
  RegisterUserUseCase,
  ResolveTokenUseCase,
} from '@application';

import { DI } from '@/core/di/di';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: ResolveTokenUseCase,
      useFactory: () => new ResolveTokenUseCase({}),
    },
    {
      provide: LoginUseCase,
      useFactory: () =>
        new LoginUseCase({ usersRepository: DI.usersRepository }),
    },
    {
      provide: RegisterUserUseCase,
      useFactory: () =>
        new RegisterUserUseCase({ usersRepository: DI.usersRepository }),
    },
  ],
  exports: [ResolveTokenUseCase],
})
export class AuthModule {}
