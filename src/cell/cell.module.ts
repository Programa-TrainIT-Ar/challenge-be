import { Module } from '@nestjs/common';
import { CellController } from './cell.controller';
import { CellService } from './cell.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [CellController],
  providers: [CellService],
  imports: [PrismaModule],
})
export class CellModule {}
