import { Controller, Get, SetMetadata, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthorizationGuard } from './authorization/authorization.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/logout')
  getLogout(){
    return this.appService.getLogout()
  }

  @Get('/callback')
  getCallBack(): string {
    return this.appService.callBack()
  }

  @UseGuards(AuthorizationGuard)
  @Get('/protected')
  getProtected():string {
    return this.appService.getPrivate()
  }


  
}
