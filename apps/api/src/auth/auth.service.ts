import { Injectable } from '@nestjs/common';

import { LoginUseCase, RegisterUserUseCase } from '@application';

import { LoginRequest } from './requests/login.request';
import { AuthResponse } from './responses/auth.response';
import { UserResponse } from './responses/user.response';
import { RegisterRequest } from './requests/register.request';

@Injectable()
export class AuthService {
  constructor(
    private loginUseCase: LoginUseCase,
    private registerUseCase: RegisterUserUseCase,
  ) {}

  async login(request: LoginRequest): Promise<AuthResponse> {
    const response = await this.loginUseCase.execute(request);
    return {
      ...response,
      user: UserResponse.fromUserEntity(response.user),
    };
  }

  async register(request: RegisterRequest): Promise<AuthResponse> {
    const response = await this.registerUseCase.execute(request);
    return {
      ...response,
      user: UserResponse.fromUserEntity(response.user),
    };
  }
}
