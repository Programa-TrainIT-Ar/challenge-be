import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EmailJsImplementation } from './email-js-implementation.service';
import { HttpModule } from '@nestjs/axios'; // Importa el servicio HTTP para realizar peticiones externas
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthorizationModule } from 'src/authorization/authorization.module';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'UserMail', // Token de inyección parala interfaz UserMail
      useClass: EmailJsImplementation, // Implementación concreta del servicio de email
    },
  ],
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
  ],
  exports: [JwtModule],
})
export class UserModule {}
