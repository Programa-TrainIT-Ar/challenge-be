import { Injectable, Delete } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSkillLevelDto } from './dto/create-skilllevel.dto'
import { Prisma, SkillLevel } from '@prisma/client';
import { UpdateSkillLevelDto } from './dto/update-skilllevel.dto';


@Injectable()
export class SkillLevelService {
    constructor (private readonly prisma: PrismaService) {}

    //READ (fIND ALL)
    async findAll(){
        return this.prisma.skillLevel.findMany({
            include: { cell: true },
        });
    }

    //READ (FIND ONE BY ID)
    async findOne(id: string){
        return this.prisma.skillLevel.findUnique({
            where: { id }, 
            include: { cell: true },
        });
    }

    async create(data: CreateSkillLevelDto): Promise<SkillLevel | null> {
        return this.prisma.skillLevel.create({
            data,
        });
    }

    //UPDATE 
    async update(id: string, data: UpdateSkillLevelDto){
        return this.prisma.skillLevel.update({
            where: { id },
            data,
        });
    }

    //DELETE
    async delete(id: string){
        return this.prisma.skillLevel.delete({
            where: { id }
        })
    }


}