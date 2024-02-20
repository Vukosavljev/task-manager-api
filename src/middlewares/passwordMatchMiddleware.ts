import { NextFunction, Response } from 'express';
import { HttpException, IUserInfoRequest, RequestLoginBody } from '@types';
import {
  HTTP_STATUS_CODES,
  INVALID_EMAIL_OR_PASSWORD_ERROR_MESSAGE,
} from '@constants';

export const passwordMatch = async (
  req: IUserInfoRequest<object, object, RequestLoginBody>,
  _: Response,
  next: NextFunction
) => {
  const {
    user,
    body: { password },
  } = req;

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect)
    return next(
      new HttpException(
        INVALID_EMAIL_OR_PASSWORD_ERROR_MESSAGE,
        HTTP_STATUS_CODES.UNAUTHORIZED
      )
    );

  next();
};
