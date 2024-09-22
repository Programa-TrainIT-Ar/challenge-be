
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super();
  }

  async onModuleInit() {
    try{
    await this.$connect();
  }catch(error){
    console.error("error en conexion con la base de datos:",error);
  }
  }
  async onModuleDestroy() {
    try{
    await this.$disconnect();
  }catch(error){
    console.error("error en desconexion con la base de datos:",error)
  }
  }
}

