import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  // Definición de la clave de la claim personalizada
  private readonly ROLES_CLAIM = 'https://miaplicacion.com/roles';

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    if (!requiredRoles) {
      return true; // Si no se requieren roles, permite el acceso
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    //PASO 1: Verificar existencia del usuario  (payload)
    if (!user) {
      // Si no hay usuario, el token falló la validación o no se proporcionó
      return false; // El HybridGuard ya debería haber lanzado una excepción antes.
      // throw new ForbiddenException("Token de acceso no proporcionado o inválido")
    }

    // PASO 2: Extraer roles de la claim personalizada o de permissions
    const userRoles: string[] = user[this.ROLES_CLAIM] || user.permissions;

    // Si todavía no hay roles, se denega el acceso
    if (!userRoles || userRoles.length === 0) {
      throw new ForbiddenException(
        'Su token no contiene los roles requeridos para la autorización.',
      );
    }

    // PASO 3: Ejecutar la lógica de comprobación
    const hasRequiredRoles = requiredRoles.some((role) =>
      userRoles.includes(role),
    );

    if (!hasRequiredRoles) {
      throw new ForbiddenException(
        'No tienes permiso para acceder a este recurso (Roles insuficientes).',
      );
    }

    return true;
  }
}
