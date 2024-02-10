import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IUserInfoRequest, Token } from '../types';
import User from '../models/user.model';

export const isAuthenticated = async (
  req: IUserInfoRequest,
  res: Response,
  next: NextFunction
) => {
  let token: string;

  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token)
    res.status(401).json({
      success: false,
      message: 'Login first to access this resource.',
    });

  const decoded = jwt.verify(token, process.env.JWT_SECRET) as Token;
  req.user = await User.findById(decoded.id);

  next();
};
