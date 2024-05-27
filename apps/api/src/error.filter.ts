import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';

import { CustomError } from '@domain';

import { BasicResponse } from './core/responses/basic.response';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  catch(error: Error, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    let statusCode: number, type: string, errors: Array<string>;
    if (error instanceof CustomError) {
      statusCode = error.code;
      type = error.type;
      errors = error.errors;
    } else if (error instanceof HttpException) {
      statusCode = error.getStatus();
      type = error.name;
      errors = [error.message];
    } else {
      console.error(error);
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      type = 'UNKNOWN';
      errors = [];
    }
    return response
      .status(statusCode)
      .send(BasicResponse.error(statusCode, type, errors));
  }
}
