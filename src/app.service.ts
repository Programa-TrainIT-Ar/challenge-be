import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '🎊🥳🎊🥳 Welcome to this Challenge 2,024...!!! 🥳🎊🥳🎊';
  }

  getPublic(): string {
    return 'This is a public api 🎈';
  }

  getPrivate(): string {
    return 'This is a private api 🕵️‍♂️';
  }
}
