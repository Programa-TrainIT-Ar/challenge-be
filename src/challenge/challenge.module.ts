import { Module } from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { ChallengeController } from './challenge.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ChallengeController],
  providers: [ChallengeService],
  imports: [PrismaModule]
})
export class ChallengeModule {}
