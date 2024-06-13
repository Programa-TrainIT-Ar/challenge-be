import { CanActivate, ExecutionContext, Injectable, Redirect, UnauthorizedException } from '@nestjs/common';
import { expressJwtSecret } from 'jwks-rsa';
import { promisify } from 'util';
import { expressjwt } from 'express-jwt';
import * as jwt from 'express-jwt'
import { log } from 'console';

// import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthorizationGuard implements CanActivate {

  private CLIENT_ID: string = process.env.CLIENT_ID
  private ISSUER_BASE_URL: string = process.env.ISSUER_BASE_URL


  async canActivate(context: ExecutionContext): Promise<boolean> {

      const req = context.getArgByIndex(0)
      const res = context.getArgByIndex(1)

      

      const checkJwt = promisify (
        expressjwt({
          secret: expressJwtSecret({
            cache: true,
            rateLimit: true,
            jwksRequestsPerMinute: 5,
            jwksUri: `${this.ISSUER_BASE_URL}.well-know/jwks.json`
          })as any,
          audience: this.CLIENT_ID,
          issuer: this.ISSUER_BASE_URL,
          algorithms: ['RS256']
        })
      );
      try {
        await checkJwt(req, res)
        return true;
      } catch (error) {
        console.log(this.ISSUER_BASE_URL);
        throw new UnauthorizedException(error)

        // res.redirect('https://dev-anq6akqu2adna18f.us.auth0.com/u/login?state=hKFo2SBLWXBhWkt5b0s3TGxLNUJibEtlM18zTEtodnJoTklIQ6Fur3VuaXZlcnNhbC1sb2dpbqN0aWTZIEdMcW9vRUVjeVNNbERWdEdFanFkZkpXRkpCRW9GbXZNo2NpZNkgVFFycGNuMnlKdTkzdkxDRmZsaWJncjlYOThYNlRKYmc')
        // return false
      }

  }
}
