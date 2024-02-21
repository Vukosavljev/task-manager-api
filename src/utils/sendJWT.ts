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
  // Check why cookie is not readable
  // res.cookie('token', token, options);

  if (NODE_ENV === 'prod') options.secure = true;

  return res.status(statusCode).json({
    success: true,
    token,
  });
};
