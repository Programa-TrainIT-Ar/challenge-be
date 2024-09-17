import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { PrismaModule } from '../prisma-module/prisma.module';

@Module({
  imports: [PrismaModule], // Importa PrismaModule si UsuariosService depende de PrismaService
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService], // Exporta si otros módulos necesitan usar UsuariosService
})
export class UsuariosModule {}
