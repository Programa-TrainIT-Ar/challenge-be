import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthorizationModule } from './authorization/authorization.module';
import { ModuleModule } from './module/module.module';
import { CellModule } from './cell/cell.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthorizationModule,
    ModuleModule,
    CellModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
