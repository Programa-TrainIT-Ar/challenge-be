import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { User } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() user: User) {
    return this.authService.registerUser(user);
  }

  @UseGuards(AuthenticationGuard)
  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    return this.authService.validateUser(loginDto.email, loginDto.password);
  }
}
