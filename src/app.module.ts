import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthorizationGuard } from './authorization/authorization.guard';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.template',
      isGlobal: true, // Hace que ConfigService esté disponible en toda la aplicación
    }),
    UserModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AuthorizationGuard,
    PrismaService
  ],
})
export class AppModule {}
