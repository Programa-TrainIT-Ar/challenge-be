import { Module } from '@nestjs/common';
import { AuthorizationGuard } from './authorization.guard';
import { RolesGuard } from './roles/roles.guard';
import { PassportModule } from '@nestjs/passport'; 
import { JwtStrategy } from './jwt.strategy';
import { HybridAuthGuard } from './hybrid-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Module({
    imports:[PassportModule.register({ defaultStrategy: 'jwt' })],
    providers: [AuthorizationGuard, RolesGuard, JwtStrategy, HybridAuthGuard, LocalAuthGuard],
    exports: [AuthorizationGuard, RolesGuard, HybridAuthGuard, LocalAuthGuard],
})
export class AuthorizationModule {}
