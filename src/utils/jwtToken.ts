import { CookieOptions, Response } from 'express';
import { UserModel } from '../models/user.model';

export const sendToken = (
  user: UserModel,
  statusCode: number,
  res: Response
) => {
  const token = user.getJwtToken();
  const options: CookieOptions = {
    expires: new Date(
      Date.now() + +process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'prod') options.secure = true;

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
  });
  return;
};
