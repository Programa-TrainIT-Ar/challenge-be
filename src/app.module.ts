import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthorizationModule } from './authorization/authorization.module';
import { QuizModule } from './quiz/quiz.module';
import { PrismaModule } from './prisma/prisma.module';
import { ModuleModule } from './module/module.module';
import { CellModule } from './cell/cell.module';
import { SkillLevelModule } from './skill-level/skill-level.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthorizationModule,
    QuizModule,
    PrismaModule,
    ModuleModule,
    CellModule,
    SkillLevelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
