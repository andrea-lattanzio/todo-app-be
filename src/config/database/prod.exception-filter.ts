import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Response } from 'express';

@Catch(PrismaClientKnownRequestError)
export class ProductionPrismaExceptionFilter extends BaseExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const entity = exception.meta;
    let statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR;

    switch (exception.code) {
      case 'P2025':
        statusCode = HttpStatus.NOT_FOUND;
        response
          .status(statusCode)
          .json({
            statusCode: statusCode,
            message: `${entity.modelName} was not found`,
          });
        break;
      case 'P2002':
      case 'P2003':
        statusCode = HttpStatus.CONFLICT;
        response
          .status(statusCode)
          .json({
            statusCode: statusCode,
            message: `${entity.modelName} name is already present`,
          });
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
