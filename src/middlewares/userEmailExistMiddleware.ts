import { NextFunction, Response } from 'express';
import { HttpException, IUserInfoRequest, RequestLoginBody } from '@types';
import { User } from '@models';
import {
  HTTP_STATUS_CODES,
  INVALID_EMAIL_OR_PASSWORD_ERROR_MESSAGE,
} from '@constants';

export const userEmailExist = async (
  req: IUserInfoRequest<object, object, RequestLoginBody>,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user)
    return next(
      new HttpException(
        INVALID_EMAIL_OR_PASSWORD_ERROR_MESSAGE,
        HTTP_STATUS_CODES.UNAUTHORIZED
      )
    );

  req.user = user;
  next();
};
