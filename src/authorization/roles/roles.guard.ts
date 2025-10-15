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

    if(!user){
      throw new ForbiddenException("Token de acceso no proporcionado o inválido")
    }
    
    if (user.permissions) {
      const hasRequiredPermissions = requiredRoles.some(role => user.permissions.includes(role));
      if (!hasRequiredPermissions) {
        throw new ForbiddenException('No tienes permiso para acceder a este recurso');
      }
    }
    // Verifica que la consulta machine to machine tenga el scope requerido 
    else if (user.scope) {
      const scopes = user.scope.split(' ');
      const hasRequiredScope = () => requiredRoles.some(role => scopes.includes(role));
      if (!hasRequiredScope()) {
        throw new ForbiddenException('No tienes el alcance para acceder a este recurso');
      }
    
    } else { //El usuario no tiene permissions ni scope
      throw new ForbiddenException('Error en el token de acceso');
    }
    return true;
    }
   }