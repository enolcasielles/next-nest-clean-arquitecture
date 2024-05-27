import { Body, Controller, Post } from '@nestjs/common';

import { LoginRequest } from './requests/login.request';
import { AuthResponse } from './responses/auth.response';
import { AuthService } from './auth.service';
import { RegisterRequest } from './requests/register.request';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() request: LoginRequest): Promise<AuthResponse> {
    return await this.authService.login(request);
  }

  @Post('register')
  async register(@Body() request: RegisterRequest): Promise<AuthResponse> {
    return await this.authService.register(request);
  }
}
