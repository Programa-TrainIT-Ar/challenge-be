import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthorizationModule } from './authorization/authorization.module';
import { AuthorizationGuard } from './authorization/authorization.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.template',
      isGlobal: true, // Hace que ConfigService esté disponible en toda la aplicación
    }),
    AuthorizationModule
  ],
  controllers: [AppController],
  providers: [AppService, AuthorizationGuard],
})
export class AppModule {}
