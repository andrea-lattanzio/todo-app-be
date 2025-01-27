import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Response } from 'express';

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter extends BaseExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const message = exception.message.replace(/\n/g, '') || 'Internal server error';
    const entity = exception.meta || 'entity';
    let statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR;

    switch (exception.code) {
      case 'P2025':
        statusCode = HttpStatus.NOT_FOUND;
        response
          .status(statusCode)
          .json({ statusCode: statusCode, entity: entity, message: message });
        break;
      case 'P2002':
        statusCode = HttpStatus.CONFLICT;
        response
          .status(statusCode)
          .json({ statusCode: statusCode, entity: entity, message: message });
        break;
      case 'P2003':
        statusCode = HttpStatus.BAD_REQUEST;
        response
          .status(statusCode)
          .json({ statusCode: statusCode, entity: entity, message: message });
        break;
      default:
        response.status(statusCode).json({
          statusCode: statusCode,
          message: 'An error occured during the request',
        });
        break;
    }
  }
}
