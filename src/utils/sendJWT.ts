import { CookieOptions, Response } from 'express';
import { UserModel } from '../models/userModel';

export const sendToken = (
  user: UserModel,
  statusCode: number,
  res: Response
) => {
  const { COOKIE_EXPIRES_TIME, NODE_ENV } = process.env;
  const token = user.getJwtToken();
  const options: CookieOptions = {
    expires: new Date(Date.now() + +COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  if (NODE_ENV === 'prod') options.secure = true;

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
  });
  return;
};
