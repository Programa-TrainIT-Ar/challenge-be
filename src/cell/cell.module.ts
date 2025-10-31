import { Module } from '@nestjs/common';
import { CellService } from './cell.service';
import { CellController } from './cell.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthorizationModule } from 'src/authorization/authorization.module';

@Module({
  controllers: [CellController],
  providers: [CellService],
  imports: [PrismaModule, AuthorizationModule],
})
export class CellModule {}
