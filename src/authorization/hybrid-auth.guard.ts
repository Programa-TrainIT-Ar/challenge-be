// src/authorization/hybrid-auth.guard.ts
import { 
  Injectable, 
  ExecutionContext, 
  UnauthorizedException, 
  CanActivate,
  Inject,
} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard'; // Asegúrate de que la ruta es correcta
import { AuthorizationGuard } from './authorization.guard'; // Asegúrate de que la ruta es correcta
import { Reflector } from '@nestjs/core'; // Necesario si usas el HybridGuard para rutas con Roles

@Injectable()
export class HybridAuthGuard implements CanActivate {
  // Inyectamos los dos guards que queremos usar
  constructor(
    private readonly reflector: Reflector,
    @Inject(LocalAuthGuard) private localGuard: LocalAuthGuard,
    @Inject(AuthorizationGuard) private auth0Guard: AuthorizationGuard,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 1. Intentar con el Token Local (JWT de tu aplicación)
    try {
      // Usamos el canActivate original, que ejecuta la JwtStrategy local
      const result = await this.localGuard.canActivate(context);
      if (result) {
        // Si el token es local y válido, detiene la ejecución y devuelve true.
        return true;
      }
    } catch (localError) {
      // Ignoramos el error de validación local (puede ser un token de Auth0)
    }

    // 2. Si el local falló o no se encontró token, intentar con Auth0
    try {
      // Usamos el canActivate original, que ejecuta la validación de Auth0 (jwks-rsa)
      const result = await this.auth0Guard.canActivate(context);
      
      // *** Nota Importante: Exponer el Rol para RolesGuard ***
      // Si el token de Auth0 es válido, necesitamos asegurar que req.user exista.
      // Tu AuthorizationGuard de Auth0 ya adjunta el payload del token (req.auth) a req.user.
      // Para rutas con Roles, asegúrate de que el token de Auth0 incluya las claims de rol
      // y que tu RolesGuard sepa leerlas desde Auth0.
      
      return result;

    } catch (auth0Error) {
      // 3. Si ambos fallan, lanzar la excepción final
      throw new UnauthorizedException('Token inválido o expirado.');
    }
  }
}