import { NextFunction, Response } from 'express';
import { validationResult } from 'express-validator';
import { IUserInfoRequest } from '@types';

export const validate = (
  req: IUserInfoRequest,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  const errorMessages = errors.array().map((err) => err.msg);
  return res.status(422).json({
    success: false,
    errors: errorMessages,
  });
};
