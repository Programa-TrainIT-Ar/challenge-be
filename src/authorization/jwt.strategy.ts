import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private configService: ConfigService) {
    super({
      // Extrae el token de la cabecera 'Authorization: Bearer <token>'
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'), 
    });
  }

  // Este método se ejecuta SÓLO si el token es válido (firma, expiración)
  async validate(payload: any) {
    // Retorna la carga útil del token. Esto se inyecta en req.user.
    // El payload de JWT debe contener 'sub' (userId) y 'email'
    return { userId: payload.sub, email: payload.email, role: payload.role, is_superuser: payload.is_superuser,
        AUTH0_ROLES_CLAIM: payload["AUTH0_ROLES_CLAIM"] }; 
  }
}