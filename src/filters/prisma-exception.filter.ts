/*import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(BadRequestException)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse: any = exception.getResponse();

    response.status(status).json({
      statusCode: status,
      message: exceptionResponse.message || 'Validation failed',
      error: exceptionResponse.error || exceptionResponse,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
*/
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';

@Catch()
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    // Manejo de excepciones de Prisma
    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      if (exception.code === 'P2002') {
        status = HttpStatus.BAD_REQUEST;
        message = 'Unique constraint failed';
      } else if (exception.code === 'P2003') {
        status = HttpStatus.BAD_REQUEST;
        message = 'Foreign key constraint failed';
      } else if (exception.code === 'P2025') {
        status = HttpStatus.NOT_FOUND;
        message = 'Record not found';
      }
    }
    // Manejo de excepciones de tipo HttpException como BadRequestException
    else if (exception instanceof BadRequestException) {
      const exceptionResponse: any = exception.getResponse();
      status = exception.getStatus();
      message = exceptionResponse.message || 'Validation failed';
    } else if (exception instanceof Prisma.PrismaClientValidationError) {
      status = HttpStatus.BAD_REQUEST;
      // Verificar si hay errores antes de mapear
      message = Array.isArray(exception.errors)
        ? exception.errors.map((err) => err.message)
        : ['Validation error in Prisma request'];
    }
    // Manejo de otras excepciones de tipo HttpException
    else if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    }

    // Responder con el mensaje de error adecuado
    response.status(status).json({
      statusCode: status,
      message: message,
      error: exception.name || 'Error',
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
