import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '🎊🥳🎊🥳 Welcome to this Challenge 2,024...!!! 🥳🎊🥳🎊';
  }

  getPrivate(): string {
    return 'This is a protected resource. Register now visitor!';
  }
}
