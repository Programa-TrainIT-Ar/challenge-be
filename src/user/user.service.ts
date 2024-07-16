import { Body, ConflictException, Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { error } from 'console';

@Injectable()
export class UserService {

  constructor(private prisma : PrismaService) {}

  async  create(createUserDto: CreateUserDto) {
    if (!createUserDto) {
      throw new NotFoundException('Data required')
    }
    const user = await this.prisma.user.findUnique({where:{email:createUserDto.email}})
    if (user) {
      throw new NotFoundException('Email is already exist')
    }
    try {
      return this.prisma.user.create({ data : createUserDto})

    } catch (error) {
      throw error
    }

  }

  findAll() {
    return this.prisma.user.findMany()
  }

  async findOne(id: string) {
    if (!id) {
      throw new NotImplementedException('ID required')
    }
    if (id.length != 25) {
      throw new NotFoundException('Correct ID required')
    }

  const user = await this.prisma.user.findUnique({where:{id}})

  if (!user) {
    throw new NotFoundException(`User with ID: ${id} Not Found`)
  }

    return user
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      // Valida que el ID tenga la longitud requerida 
      if (id.length != 25) {
        throw new NotFoundException('Correct ID required')
      }
      if (!id) {
        throw new NotFoundException('ID required')
      }
      
      return this.prisma.user.update({where:{id}, data:updateUserDto});

    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Email already exists');
      }
      throw error
    }
    
  }

  async remove(id: string) {
    if (id.length != 25) {
      throw new NotFoundException('Correct ID required')
    }
    if (!id) {
      throw new NotFoundException('ID required')
    }
    const  userDeleted = await this.prisma.user.delete({where:{id}})
    if (!userDeleted) {
      throw new NotFoundException(`User with ID: ${id} Not Found`)
    }

    return userDeleted

  }
}
