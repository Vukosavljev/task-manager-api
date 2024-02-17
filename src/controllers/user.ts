import { Response } from 'express';
import { IUserInfoRequest } from '@types';
import User from '../models/user.model';
import { validationResult } from 'express-validator';
import {
  INVALID_EMAIL_OR_PASSWORD_ERROR_MESSAGE,
  USER_WITH_EMAIL_NOT_FOUND_ERROR_MESSAGE,
} from '@constants';
import { sendToken } from '@utils';

export const register = async (req: IUserInfoRequest, res: Response) => {
  const { name, email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      errors: errors.array(),
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
      errors: errors.array(),
    });
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return res
      .status(401)
      .json({ success: false, error: INVALID_EMAIL_OR_PASSWORD_ERROR_MESSAGE });
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    return res
      .status(401)
      .json({ success: false, error: INVALID_EMAIL_OR_PASSWORD_ERROR_MESSAGE });
  }
  try {
    sendToken(user, 200, res);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
  }
};

export const logout = async (req: IUserInfoRequest, res: Response) => {
  const { email } = req.body;
  res.send({ email });
};

export const remove = async (req: IUserInfoRequest, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return res
      .status(401)
      .json({ success: false, error: INVALID_EMAIL_OR_PASSWORD_ERROR_MESSAGE });
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    return res
      .status(401)
      .json({ success: false, error: INVALID_EMAIL_OR_PASSWORD_ERROR_MESSAGE });
  }

  try {
    await user.deleteOne();
    return res.status(200).json({ success: true, message: 'User deleted' });
  } catch (error) {
    res.json({ success: true, error });
  }
};

export const resetPassword = async (req: IUserInfoRequest, res: Response) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user)
    return res
      .status(404)
      .json({ success: false, error: USER_WITH_EMAIL_NOT_FOUND_ERROR_MESSAGE });
  const token = user.getResetPasswordToken();
  console.log(token);
  res.send({ user });
};
