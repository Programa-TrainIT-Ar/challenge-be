import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { SkillLevelService } from './skill-level.service';
import { Prisma } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { CreateSkillLevelDto } from './dto/create-skilllevel.dto';
import { UpdateSkillLevelDto } from './dto/update-skilllevel.dto';

@ApiTags('Skill Level')
@Controller('skill-level')
export class SkillLevelController {
    constructor(private readonly skillLevelService: SkillLevelService ){}

    @Post()
    create(@Body() createSkillLevelDto: CreateSkillLevelDto ){
        return this.skillLevelService.create(createSkillLevelDto);
    }

    @Get()
    findAll(){
        return this.skillLevelService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.skillLevelService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id:string, @Body() updateSkillLevelDto: UpdateSkillLevelDto){
        return this.skillLevelService.update(id, updateSkillLevelDto);
    }

    @Delete(':id')
    delete(@Param('id') id:string){
        return this.skillLevelService.delete(id)
    }

}
