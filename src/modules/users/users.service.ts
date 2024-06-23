import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, User, Role, Challenges } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  //Get all users/all
  async findAll(): Promise<User[]> {
    return await this.databaseService.user.findMany();
  }

  //Get all users, handle Query by role
  async findByRole(role: Role): Promise<User[]> {
    let users: User[];

    if (role) {
      users = await this.databaseService.user.findMany({
        where: { role },
      });

      if (users.length === 0) {
        throw new NotFoundException('User Role Not Found');
      }
      return users;
    } else {
      return await this.databaseService.user.findMany();
    }
    return users;
  }

  //Get one user by his id, if id is not valid throw error,
  // if user with that id dosent exist throw error
  async findById(id: string): Promise<User & { challenges: Challenges[] }> {
    if (!this.isValidId(id)) {
      throw new BadRequestException('Valid Id required.');
    }

    const user = await this.databaseService.user.findUnique({
      where: { id },
      include: { challenges: true },
    });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }
  // Custom method to validate the id (assuming cuid format)
  private isValidId(id: string): boolean {
    const cuidRegex = /^c[^\s-]{24,}$/; // Basic regex for cuid validation
    return cuidRegex.test(id);
  }

  //Post new user using dto validators
  async createUser(createdUser: Prisma.UserCreateInput): Promise<User> {
    return await this.databaseService.user.create({ data: createdUser });
  }

  //Put user with dto validators
  async updateById(
    id: string,
    updatedUser: Prisma.UserUpdateInput,
  ): Promise<User> {
    return await this.databaseService.user.update({
      where: { id },
      data: updatedUser,
    });
  }

  //Delete user by his id
  async deleteById(id: string): Promise<User> {
    return await this.databaseService.user.delete({ where: { id } });
  }
}
