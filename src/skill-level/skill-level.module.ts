import { Module } from '@nestjs/common';
import { SkillLevelController } from './skill-level.controller';
import { SkillLevelService } from './skill-level.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [SkillLevelController],
  providers: [SkillLevelService],
  imports: [PrismaModule]
})
export class SkillLevelModule {}
