import { Module } from '@nestjs/common';
import { CellService } from './cell.service';
import { CellController } from './cell.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [CellController],
  providers: [CellService],
  imports: [PrismaModule],
})
export class CellModule {}
