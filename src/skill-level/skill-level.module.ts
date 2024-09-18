import { Module } from '@nestjs/common';
import { SkillLevelController } from './skill-level.controller';
import { SkillLevelService } from './skill-level.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [SkillLevelController],
  providers: [SkillLevelService, PrismaService]
})
export class SkillLevelModule {}
