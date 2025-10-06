import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'; 
// import { UserService } from './user.service'; // Se usará cuando se vaya a verificar el rol del usuario

// Debes tener una JwtStrategy local configurada en tu AuthModule
// que usa el JWT_SECRET de tu .env.
@Injectable()
export class LocalAuthGuard extends AuthGuard('jwt') {
    // Aquí se podrá añadir lógica si el token es válido pero se quiere chequear roles o status
    canActivate(context: ExecutionContext) {
        // Llama al JwtStrategy('jwt') para validar el token.
        return super.canActivate(context);
    }
}