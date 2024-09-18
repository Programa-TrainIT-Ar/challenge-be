import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
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
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Manejo de errores de Prisma
    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      if (exception.code === 'P2002') {
        // Manejar error de valor duplicado
        response.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Unique constraint failed',
          error: 'Bad Request',
          path: request.url,
          timestamp: new Date().toISOString(),
        });
      } else if (exception.code === 'P2003') {
        // Manejar error de clave foránea
        response.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Foreign key constraint failed',
          error: 'Bad Request',
          path: request.url,
          timestamp: new Date().toISOString(),
        });
      } else if (exception.code === 'P2025') {
        // Manejar error de registro no encontrado
        response.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Record not found',
          error: 'Not Found',
          path: request.url,
          timestamp: new Date().toISOString(),
        });
      }
    } else {
      // Otros errores
      response.status(status).json({
        statusCode: status,
        message: exception.message || 'Internal server error',
        error: exception.name || 'Error',
        path: request.url,
        timestamp: new Date().toISOString(),
      });
    }
  }
}
