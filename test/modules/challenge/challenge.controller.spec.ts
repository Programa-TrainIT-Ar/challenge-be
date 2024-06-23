import { Test, TestingModule } from '@nestjs/testing';
import { ChallengeController } from '../../src/modules/challenge/challenge.controller';
import { ChallengeService } from '../../src/modules/challenge/challenge.service';

describe('ChallengeController', () => {
  let controller: ChallengeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChallengeController],
      providers: [ChallengeService],
    }).compile();

    controller = module.get<ChallengeController>(ChallengeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
