import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma-module/prisma.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { ConfigModule } from '@nestjs/config';
import { CandidatesModule } from './candidates/candidates.module';

@Module({
  imports: [PrismaModule,CandidatesModule, UsuariosModule, AuthorizationModule,ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
