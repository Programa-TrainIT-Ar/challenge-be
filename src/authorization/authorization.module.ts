import { Module } from '@nestjs/common';
import { AuthorizationGuard } from './authorization.guard';
import { RolesGuard } from './roles/roles.guard';

@Module({
  providers: [AuthorizationGuard, RolesGuard],
  exports: [AuthorizationGuard, RolesGuard],
})
export class AuthorizationModule {}
