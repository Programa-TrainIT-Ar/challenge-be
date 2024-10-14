import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true; // Si no se requieren roles, permite el acceso
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; 

    // Verifica si el usuario tiene alguno de los roles requeridos
    const hasRole = () => user && user.permissions && requiredRoles.some(role => user.permissions.includes(role));
    if (!(user && hasRole())) {
      throw new ForbiddenException('No tienes permiso para acceder a este recurso');
    }
    return true;
  }
}
