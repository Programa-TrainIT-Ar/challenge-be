import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '🎊🥳🎊🥳 Welcome to this Challenge 2,024...!!! 🥳🎊🥳🎊';
  }

  getLogout(): string {
    return 'Logout!';
  }

  getPrivate(): {} {
    return {protegido:'This is a protected resource. Register now visitor!'};
  }

  callBack(): string {
    return 'CallBack';
  }
}
