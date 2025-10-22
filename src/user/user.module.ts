import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EmailService } from './email.service';
import { HttpModule } from '@nestjs/axios'; // Importa el servicio HTTP para realizar peticiones externas
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthorizationModule } from 'src/authorization/authorization.module';

@Module({
  controllers: [UserController],
  providers: [UserService, EmailService],
  imports: [
    PrismaModule,
    AuthorizationModule,
    HttpModule,
    JwtModule.registerAsync({
      //Configurando el JwtModule
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        //Obtener el valor de la variable JWT_SECRET de forma segura
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '3d' }, //Tiempo para expirar de cada token
      }),
      inject: [ConfigService], 
    }),
    
  ], exports: [JwtModule]
})
export class UserModule {}
