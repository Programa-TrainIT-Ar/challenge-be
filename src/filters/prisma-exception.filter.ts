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
    } else if (exception instanceof Prisma.PrismaClientValidationError) {
      status = HttpStatus.BAD_REQUEST;

      // Verifica si hay un mensaje detallado
      if (exception.message) {
        const detailedMessages = [];

        // Simulación de análisis de error (esto puede variar dependiendo de la versión de Prisma)
        if (exception.message.includes('Validation error')) {
          // Extraer errores específicos de la validación si están disponibles
          detailedMessages.push('Validation error in Prisma request');
        } else {
          // Si hay detalles sobre qué campos fallaron
          detailedMessages.push(exception.message);
        }

        message = detailedMessages;
      } else {
        message = ['Validation error in Prisma request'];
      }
    }
    // Si es una excepción de tipo HttpException
    else if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    }

    // Responder con el mensaje de error adecuado
    response.status(status).json({
      statusCode: status,
      message: Array.isArray(message) ? message : [message],
      error: exception.name || 'Error',
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
