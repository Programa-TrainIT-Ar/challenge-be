// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { passportJwtSecret } from 'jwks-rsa';
// import * as dotenv from 'dotenv';
// dotenv.config();
// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
// constructor() {
// // allow JWT-formatted tokens to be parsed
// // and RSA56 signed tokens to be accepted
// super({
// secretOrKeyProvider: passportJwtSecret({
// cache: true,
// rateLimit: true,
// jwksRequestsPerMinute: 5,
// jwksUri: `${process.env.AUTH0_ISSUER_URL}.well-known/jwks.json`,
// }),
// jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
// audience: process.env.AUTH0_AUDIENCE,
// issuer: `${process.env.AUTH0_ISSUER_URL}`,
// algorithms: ['RS256'],
// });
// }
// // auth0 will have authenticated the user and the payload will give us
// // information about the user which we can abtract such as the sub
// validate(payload: unknown): unknown {
// return payload;
// }
// }