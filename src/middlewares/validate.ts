import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { UserModel } from 'models/user.model';

export const validate = <T extends Request>(
  req: T & { user: UserModel },
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
