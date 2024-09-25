import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';

import { AuthorizationModule } from './authorization/authorization.module';
import { UsuariosModule } from './usuarios/usuarios.module';

import { ModuleModule } from './module/module.module';
import { CellModule } from './cell/cell.module';
import { QuizModule } from './quiz/quiz.module';
import { QuestionModule } from './question/question.module';


@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
