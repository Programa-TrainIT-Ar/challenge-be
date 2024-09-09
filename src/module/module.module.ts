import { Module } from '@nestjs/common';

import { ModuleController } from './module.controller';
import { ModuleService } from './module.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ModuleController],
  providers: [ModuleService],
  imports: [PrismaModule],
})
export class ModuleModule {}
