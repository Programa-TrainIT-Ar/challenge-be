import { Controller, Get, Post, Patch, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { User } from '@prisma/client';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('candidatos')
@Controller('candidates')
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo candidato' })
  @ApiResponse({ status: 201, description: 'Candidato creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Error al crear el candidato.' })
  async create(@Body() createCandidateDto: CreateCandidateDto): Promise<User> {
    return this.candidatesService.create(createCandidateDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los candidatos' })
  @ApiResponse({ status: 200, description: 'Lista de candidatos.' })
  async findAll(): Promise<User[]> {
    return this.candidatesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un candidato por ID' })
  @ApiResponse({ status: 200, description: 'Candidato encontrado.' })
  @ApiResponse({ status: 404, description: 'Candidato no encontrado.' })
  async findOne(@Param('id') id: string): Promise<User> {
    return this.candidatesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un candidato por ID' })
  @ApiResponse({ status: 200, description: 'Candidato actualizado.' })
  @ApiResponse({ status: 404, description: 'Candidato no encontrado.' })
  async update(@Param('id') id: string, @Body() updateCandidateDto: CreateCandidateDto): Promise<User> {
    return this.candidatesService.update(id, updateCandidateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un candidato por ID' })
  @ApiResponse({ status: 200, description: 'Candidato eliminado.' })
  @ApiResponse({ status: 404, description: 'Candidato no encontrado.' })
  async remove(@Param('id') id: string): Promise<User> {
    return this.candidatesService.remove(id);
  }
}
