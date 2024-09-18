import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { SkillLevelService } from './skill-level.service';
import { Prisma } from '@prisma/client';


@Controller('skill-level')
export class SkillLevelController {
    constructor(private readonly skillLevelService: SkillLevelService ){}

    @Post()
    create(@Body() CreateSkillLevelDto: Prisma.SkillLevelCreateInput ){
        return this.skillLevelService.create(CreateSkillLevelDto);
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
    update(@Param('id') id:string, @Body() updateSkillLevelDto: Prisma.SkillLevelUpdateInput){
        return this.skillLevelService.update(id, updateSkillLevelDto);
    }

    @Delete(':id')
    delete(@Param('id') id:string){
        return this.skillLevelService.delete(id)
    }

}
