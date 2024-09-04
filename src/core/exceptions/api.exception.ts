import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCodes as AppErrorCodes } from '@app/exceptions/error-codes.constant';
import { ErrorCodes as CoreErrorCodes } from '@core/exceptions/error-codes.constant';
import { HttpExceptionResponseInterface } from '@core/exceptions/exception.filter';

export class ApiException extends HttpException {
  constructor(
    errorCode: number,
    errors: string[] = [],
    status: number = HttpStatus.UNPROCESSABLE_ENTITY,
  ) {
    let errorMessage = '';
    if (errorCode in AppErrorCodes) {
      errorMessage = AppErrorCodes[errorCode];
    } else {
      errorMessage = CoreErrorCodes[errorCode];
    }

    super(
      {
        errorCode,
        errorMessage,
        errors,
      } as HttpExceptionResponseInterface,
      status,
    );
  }
}
