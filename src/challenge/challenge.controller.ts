import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { FindChallengesFiltersDto } from './dto/find-challenges-filters.dto';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Challenge } from './entities/challenge.entity';
import { HybridAuthGuard } from 'src/authorization/hybrid-auth.guard';
import { RolesGuard } from 'src/authorization/roles/roles.guard';
import { Roles } from 'src/authorization/roles/roles.decorator';

@ApiTags('Challenge')
@Controller('challenge')
export class ChallengeController {
  constructor(private readonly challengeService: ChallengeService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo challenge' })
  @ApiOkResponse({ type: Challenge })
  create(@Body() createChallengeDto: CreateChallengeDto) {
    return this.challengeService.create(createChallengeDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(HybridAuthGuard)
  @ApiOkResponse({ description: 'Lista de  challenges devuelta exitosamente.' })
  @ApiNotFoundResponse({ description: 'Ningún challenge encontrado.' })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Filtra por first_name o last_name del usuario',
  })
  @ApiQuery({
    name: 'cell',
    required: false,
    description: 'Filtrar nombre de célula',
  })
  @ApiQuery({
    name: 'seniority',
    required: false,
    description: 'Filtrar por seniority del quiz',
  })
  @ApiQuery({
    name: 'module',
    required: false,
    description: 'Filtrar por nombre de módulo',
  })
  async findAll(@Query() filters: FindChallengesFiltersDto) {
    const { challenges, total } =
      await this.challengeService.findChallenges(filters);
    return { data: challenges, total };
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(HybridAuthGuard)
  findOne(@Param('id') id: string) {
    return this.challengeService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(HybridAuthGuard, RolesGuard)
  @Roles('admin')
  @UseGuards(HybridAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateChallengeDto: UpdateChallengeDto,
  ) {
    return this.challengeService.update(id, updateChallengeDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(HybridAuthGuard, RolesGuard)
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.challengeService.remove(id);
  }
}
