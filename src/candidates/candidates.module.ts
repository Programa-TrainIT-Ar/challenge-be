// src/candidates/candidates.module.ts
import { Module } from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CandidatesController } from './candidates.controller';
import { PrismaService } from '../prisma-module/prisma.service';

@Module({
  controllers: [CandidatesController],
  providers: [CandidatesService, PrismaService],
})
export class CandidatesModule {}
