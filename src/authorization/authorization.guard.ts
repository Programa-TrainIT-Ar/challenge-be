import { CanActivate, ExecutionContext, Injectable, Redirect, UnauthorizedException } from '@nestjs/common';
import { expressJwtSecret, GetVerificationKey } from 'jwks-rsa';
import { promisify } from 'util';
import { expressjwt } from 'express-jwt';

@Injectable()
export class AuthorizationGuard implements CanActivate {

  private AUTH0_AUDIENCE: string = process.env.AUTH0_AUDIENCE
  private AUTH0_DOMAIN: string = process.env.AUTH0_DOMAIN

  async canActivate(context: ExecutionContext): Promise<boolean> {

      const req = context.getArgByIndex(0)
      const res = context.getArgByIndex(1)

      const checkJwt = promisify (
        expressjwt({
          secret: expressJwtSecret({
            cache: true,
            rateLimit: true,
            jwksRequestsPerMinute: 5,
            jwksUri: `${this.AUTH0_DOMAIN}.well-known/jwks.json`,
          })as GetVerificationKey,
          audience: this.AUTH0_AUDIENCE,
          issuer: this.AUTH0_DOMAIN,
          algorithms: ['RS256']
        })
      );
      try {
        await checkJwt(req, res)
        return true;
      } catch (error) {
        console.log(this.AUTH0_DOMAIN);
        console.log(this.AUTH0_AUDIENCE);
        throw new UnauthorizedException(error)
      }

  }
}
