import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private databaseService: DatabaseService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.databaseService.user.findUnique({
      where: { email },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    if (!user) {
      throw new UnauthorizedException('Invalid user credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password credentials');
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async registerUser(userData: User) {
    const { email, password, ...rest } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.databaseService.user.create({
      data: {
        email,
        password: hashedPassword,
        ...rest,
      },
    });
    return user;
  }
}
