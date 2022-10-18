import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log(roles, 'roles');
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) {
      return false;
    }
    return this.matchRoles(roles, user.roles);
  }

  matchRoles(roles: string[], user: string[]): boolean {
    try {
      return roles.some((routePermission) => user.includes(routePermission)); // every is level
    } catch (error) {
      console.log('Not defind roles');
      return false;
    }
  }
}
