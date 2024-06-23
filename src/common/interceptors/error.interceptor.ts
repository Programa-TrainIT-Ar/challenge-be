import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadGatewayException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        console.error('Error caught by global interceptor:', error);

        if (error instanceof BadGatewayException) {
          return throwError(() => new Error('Gateway error'));
        } else if (error instanceof InternalServerErrorException) {
          return throwError(() => new Error('Internal server error'));
        }

        return throwError(() => new Error('Unexpected error'));
      }),
    );
  }
}
