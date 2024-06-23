import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { Challenges, Prisma } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('challenges')
@Controller('challenges')
export class ChallengeController {
  constructor(private readonly challengeService: ChallengeService) {}

  @Post(':id')
  create(
    @Param('id') id: string,
    @Body() challengeData: Prisma.ChallengesCreateInput,
  ): Promise<Challenges> {
    return this.challengeService.createChallenge(id, challengeData);
  }

  @Get()
  findAll() {
    return this.challengeService.findAll();
  }

  @Get('tag/:tag')
  findByTag(@Param('tag') tag: string): Promise<Challenges[]> {
    return this.challengeService.findByTag(tag);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.challengeService.findOne(id);
  }

  @Patch(':id')
  patch(
    @Param('id') id: string,
    @Body() upChallengeData: Prisma.ChallengesUpdateInput,
  ) {
    return this.challengeService.patch(id, upChallengeData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.challengeService.remove(id);
  }
}
