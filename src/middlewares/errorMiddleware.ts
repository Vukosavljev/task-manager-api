import { NextFunction, Response } from 'express';

import { HttpException, IUserInfoRequest } from '@types';

export const errorHandler = (
  error: HttpException,
  _: IUserInfoRequest,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  __: NextFunction
) => {
  const { statusCode, message } = error;
  res.status(statusCode).json({
    success: false,
    message,
  });
};
