import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Prisma, User, Role, Challenges } from '@prisma/client';
import { UsersService } from './users.service';
import { JwtStrategy } from '../auth/jwt.strategy';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
// import { AuthenticationGuard } from 'src/guards/authentication.guard';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('all') //GET /users
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get() //GET /users or /users?role=value
  async findByRole(@Query('role') role?: Role): Promise<User[]> {
    return this.usersService.findByRole(role);
  }

  @Get(':id') //GET /users/:id
  async findById(
    @Param('id') id: string,
  ): Promise<User & { challenges: Challenges[] }> {
    return this.usersService.findById(id);
  }

  @Post() //POST /users
  async createUser(
    @Body(ValidationPipe) userData: Prisma.UserCreateInput,
  ): Promise<User> {
    return this.usersService.createUser(userData);
  }

  // @UseGuards(AuthenticationGuard)
  @UseGuards(JwtStrategy)
  @Put(':id') //PUT /users/:id
  async updateUser(
    @Param('id') id: string,
    @Body(ValidationPipe) upUserData: Prisma.UserUpdateInput,
  ): Promise<User> {
    return this.usersService.updateById(id, upUserData);
  }

  // @UseGuards(AuthenticationGuard)
  @Delete(':id') //DELETE /users/:id
  async deleteUser(@Param('id') id: string): Promise<User> {
    return this.usersService.deleteById(id);
  }
}
