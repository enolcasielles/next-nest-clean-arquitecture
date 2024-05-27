import { SetMetadata } from '@nestjs/common';

import { Role } from '@domain';

export const ROLE_KEY = 'role';
export const Roles = (role: Array<Role>) => SetMetadata(ROLE_KEY, role);
