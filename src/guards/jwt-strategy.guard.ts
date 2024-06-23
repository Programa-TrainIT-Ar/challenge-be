import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
var { expressjwt: jwt } = require('express-jwt');

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
