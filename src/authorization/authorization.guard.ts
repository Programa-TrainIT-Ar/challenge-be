import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { expressJwtSecret } from 'jwks-rsa';
import { promisify } from 'util';
import { expressjwt } from 'express-jwt';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  private CLIENT_ID: string;
  private ISSUER_BASE_URL: string;

  constructor(private configService: ConfigService) {
    this.CLIENT_ID = this.configService.get<string>('CLIENT_ID');
    this.ISSUER_BASE_URL = this.configService.get<string>('ISSUER_BASE_URL');
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    const checkJwt = promisify(
      expressjwt({
        secret: expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: `${this.ISSUER_BASE_URL}/.well-known/jwks.json`,
        }) as any,
        audience: this.CLIENT_ID,
        issuer: this.ISSUER_BASE_URL,
        algorithms: ['RS256'],
      })
    );

    try {
      await checkJwt(req, res);
      return true;
    } catch (error) {
      console.error('JWT validation error:', error);
      console.log('Issuer URL:', this.ISSUER_BASE_URL);

      // Redirigir a la página de inicio de sesión de Auth0
      const loginUrl = `https://${this.ISSUER_BASE_URL}/login`; 
      res.redirect(loginUrl);
      return false;
    }
  }
}
