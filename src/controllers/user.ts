import { Response } from 'express';
import { IUserInfoRequest } from 'types';
import User from '../models/user.model';
import { validationResult } from 'express-validator';
import { INVALID_EMAIL_OR_PASSWORD } from '../constants';
import { sendToken } from '../utils';

export const register = async (req: IUserInfoRequest, res: Response) => {
  const { name, email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      errors,
    });
  }

  try {
    const user = await User.create({ name, email, password });
    sendToken(user, 201, res);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
  }
};

export const login = async (req: IUserInfoRequest, res: Response) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      errors,
    });
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return res
      .status(401)
      .json({ success: false, error: INVALID_EMAIL_OR_PASSWORD });
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    return res
      .status(401)
      .json({ success: false, error: INVALID_EMAIL_OR_PASSWORD });
  }
  try {
    sendToken(user, 201, res);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
  }
};

export const logout = (req: IUserInfoRequest, res: Response) => {
  const {
    body: { email },
  } = req;
  res.send({ email });
};
