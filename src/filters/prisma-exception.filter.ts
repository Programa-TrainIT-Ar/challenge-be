import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';

// Manejo de excepciones de Prisma
@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter extends BaseExceptionFilter { 
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    console.error(exception.message);  // 3
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception.message.replace(/\n/g, '');
    
    switch (exception.code) {
      //error cuando se intenta duplicar campo unico
      case 'P2002': {
        const status = HttpStatus.BAD_REQUEST;
        response.status(status).json({
          statusCode: status,
          message: 'Unique constraint failed',
        });
        break;
      }
      //error cuando una llave foranea no existe
      case 'P2003': {
        const status = HttpStatus.BAD_REQUEST;
        response.status(status).json({
          statusCode: status,
          message: 'Foreign key constraint failed',
        });
        break;
      }
      //error cuando no se encuentra un registro
      case 'P2025': {
        const status = HttpStatus.NOT_FOUND;
        response.status(status).json({
          statusCode: status,
          message: 'Record not found',
        });
        break;
      }
      //para otros errores
      default:
        // default 500 error code
        super.catch(exception, host);
        break;
    }
  }
} 
