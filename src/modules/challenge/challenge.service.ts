import { Injectable, NotFoundException } from '@nestjs/common';
import { Challenges, Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ChallengeService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createChallenge(
    id: string,
    createChallengeDto: Prisma.ChallengesCreateInput,
  ): Promise<Challenges> {
    const user = await this.databaseService.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const newChallenge = await this.databaseService.challenges.create({
      data: {
        ...createChallengeDto,
        owner: {
          connect: { id: id },
        },
      },
    });

    return newChallenge;
  }

  async findAll(): Promise<Challenges[]> {
    return this.databaseService.challenges.findMany();
  }

  async findByTag(tags: string): Promise<Challenges[]> {
    return this.databaseService.challenges.findMany({
      where: {
        tags: {
          some: {
            area: tags,
          },
        },
      },
      include: {
        tags: true,
      },
    });
  }

  async findOne(id: string): Promise<Challenges> {
    return this.databaseService.challenges.findUnique({ where: { id } });
  }

  async patch(
    id: string,
    updateChallengeDto: Prisma.ChallengesUpdateInput,
  ): Promise<Challenges> {
    return this.databaseService.challenges.update({
      where: {
        id,
      },
      data: updateChallengeDto,
    });
  }

  async remove(id: string): Promise<Challenges> {
    return this.databaseService.challenges.delete({ where: { id } });
  }
}
