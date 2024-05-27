import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ResolveTokenUseCase } from '@application';
import { Role } from '@domain';

import { ROLE_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private resolveTokenUseCase: ResolveTokenUseCase,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const validRoles = this.reflector.getAllAndOverride<Array<Role>>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!validRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];
    if (!token) return false;
    try {
      const payload = await this.resolveTokenUseCase.execute({ token });
      const isValid = validRoles.some((r) => r === payload.role);
      if (!isValid) return false;
      request.headers['user-id'] = payload.userId.toString();
      return true;
    } catch (error) {
      return false;
    }
  }
}
