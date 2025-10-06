import { Module } from '@nestjs/common';
import { AuthorizationGuard } from './authorization.guard';
import { RolesGuard } from './roles/roles.guard';
import { PassportModule } from '@nestjs/passport'; 
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports:[PassportModule.register({ defaultStrategy: 'jwt' })],
    providers: [AuthorizationGuard, RolesGuard, JwtStrategy],
    exports: [AuthorizationGuard, RolesGuard],
})
export class AuthorizationModule {}
