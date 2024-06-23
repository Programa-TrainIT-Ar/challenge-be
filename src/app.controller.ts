import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './guards/jwt-strategy.guard';
import { JwtStrategy } from './modules/auth/jwt.strategy';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('root')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('public')
  getPublic(): string {
    return this.appService.getPublic();
  }

  // @UseGuards(AuthenticationGuard)
  @UseGuards(JwtAuthGuard)
  @UseGuards(JwtStrategy)
  @Get('private')
  getPrivate(): string {
    return this.appService.getPrivate();
  }
}
