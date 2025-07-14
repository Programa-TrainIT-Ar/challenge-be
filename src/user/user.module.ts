import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EmailService } from './email.service';

@Module({
  controllers: [UserController],
  providers: [UserService, EmailService],
  imports: [PrismaModule]
})
export class UserModule {}
