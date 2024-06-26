import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthorizationGuard } from './authorization.guard'; 
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule, // Importa ConfigModule para manejar las variables de entorno
    
  ],
  providers: [
    AuthorizationGuard, // Provee AuthorizationGuard como un guardia de la aplicación
    ConfigService, // Inyecta ConfigService para acceder a las configuraciones
    
    {
      provide: APP_GUARD,
      useClass: AuthorizationGuard,
    },
  ],
  exports: [
    AuthorizationGuard, // Exporta el guardia 
  ],
})
export class AuthorizationModule {}
