import { Module } from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { ChallengeController } from './challenge.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthorizationModule } from 'src/authorization/authorization.module';

@Module({
  controllers: [ChallengeController],
  providers: [ChallengeService],
  imports: [PrismaModule, AuthorizationModule]
})
export class ChallengeModule {}
