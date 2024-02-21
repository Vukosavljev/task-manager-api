import { DEFAULT_HTTP_ERROR_MESSAGE, HTTP_STATUS_CODES } from '@constants';

export class HttpException extends Error {
  statusCode: number = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
  message: string = DEFAULT_HTTP_ERROR_MESSAGE;

  constructor(message?: string, status?: number) {
    super(message);
    this.statusCode = status;
    this.message = message;
  }
}
