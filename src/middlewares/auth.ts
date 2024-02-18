import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { USER_NOT_LOGGED_IN_ERROR_MESSAGE } from '@constants';
import { JWTPayload } from '@types';
import User, { UserModel } from '../models/user.model';

export const isAuthenticated = async <T extends Request>(
  req: T & { user: UserModel },
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  let token: string;

  if (authHeader?.startsWith('Bearer '))
    token = authHeader.substring(7, authHeader.length);

  if (!token)
    return res.status(401).json({
      success: false,
      message: USER_NOT_LOGGED_IN_ERROR_MESSAGE,
    });

  try {
    const decoded = verify(token, process.env.JWT_SECRET) as JWTPayload;
    req.user = await User.findById(decoded.id);
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: USER_NOT_LOGGED_IN_ERROR_MESSAGE,
    });
  }

  next();
};
