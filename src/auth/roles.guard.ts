import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/enums/role.enum';
import { ROLES_KEY } from './roles.decorator';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async loadRolesFromAuthorization(authorization: string): Promise<Role[]> {
    const splitAuth = authorization?.split(' ');
    if (splitAuth.length !== 2) return [];

    const token = splitAuth[1];

    const decoded = this.jwtService.decode(token);

    const creator = await this.userService.findOneByEmail(decoded.username);
    return creator?.roles ? creator?.roles : [];
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { headers } = context.switchToHttp().getRequest();

    const roles = await this.loadRolesFromAuthorization(
      headers['authorization'],
    );

    requiredRoles.push(Role.SuperAdmin);

    return requiredRoles.some((role) => roles.includes(role));
  }
}
