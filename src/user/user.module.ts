import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EmailService } from './email.service';
import { HttpModule } from '@nestjs/axios'; // Importa el servicio HTTP para realizar peticiones externas

@Module({
  controllers: [UserController],
  providers: [UserService, EmailService],
  imports: [PrismaModule, HttpModule]
})
export class UserModule {}
