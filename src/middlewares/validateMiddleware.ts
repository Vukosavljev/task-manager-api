import { NextFunction, Response } from 'express';
import { validationResult } from 'express-validator';
import { HttpException, IUserInfoRequest } from '@types';

export const validate = (
  req: IUserInfoRequest,
  _: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  const errorMessages = errors.array().map((err) => err.msg);
  throw new HttpException(errorMessages.join(' '), 422);
};
