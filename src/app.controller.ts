import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthorizationGuard } from './authorization/authorization.guard';
import { ApiBearerAuth } from '@nestjs/swagger'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiBearerAuth()
  @UseGuards(AuthorizationGuard)
  @Get('/protected')
  getProtected(@Request() req): string {
    console.log('=== DEBUG INFO ===');
    console.log('Full request.user:', JSON.stringify(req.user, null, 2));
    console.log('Type of user:', typeof req.user);
    console.log('User keys:', Object.keys(req.user || {}));
    console.log('==================');
    return this.appService.getPrivate();
  }
}
