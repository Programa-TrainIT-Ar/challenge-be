import { Injectable, Delete } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSkillLevelDto } from './dto/create-skilllevel.dto'
import { Prisma } from '@prisma/client';


@Injectable()
export class SkillLevelService {
    constructor (private readonly prisma: PrismaService) {}

    //READ (fIND ALL)
    async findAll(){
        return this.prisma.skillLevel.findMany({
            include: { cell: true, quiz: true },
        });
    }

    //READ (FIND ONE BY ID)
    async findOne(id: string){
        return this.prisma.skillLevel.findUnique({
            where: { id }, 
            include: { cell: true, quiz: true },
        });
    }


    async create(data: Prisma.SkillLevelCreateInput){
        return this.prisma.skillLevel.create({
            data,
        });
    }

    //UPDATE 
    async update(id: string, data: Prisma.SkillLevelUpdateInput){
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