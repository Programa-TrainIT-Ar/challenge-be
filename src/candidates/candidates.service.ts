// src/candidates/candidates.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma-module/prisma.service';
import { CreateCandidateDto } from './dto/create-candidate.dto'; // Verifica la importación
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CandidatesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCandidateDto: CreateCandidateDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createCandidateDto.password, 10);
    return this.prisma.user.create({
      data: {
        ...createCandidateDto,
        password: hashedPassword,
        is_active: createCandidateDto.is_active ?? true,
        is_staff: false, 
      },
    });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      where: {
        is_active: true,
        is_staff: false, // Solo candidatos
      },
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    
    if (!user) {
      throw new NotFoundException('Candidato no encontrado');
    }
    
    return user;
  }
  

  async update(id: string, updateCandidateDto: CreateCandidateDto): Promise<User> {
    
    return this.prisma.user.update({
      where: { id },
      data: updateCandidateDto,
    });
  }

  async remove(id: string): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
