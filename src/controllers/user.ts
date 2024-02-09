import { Response } from 'express';
import { IUserInfoRequest } from 'types';
import User from '../models/user.model';
import { validationResult } from 'express-validator';
import { INVALID_EMAIL_OR_PASSWORD } from '../constants';

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
    const user = await new User({ name, email, password }).save();
    const token = user.getJwtToken();
    res.status(200).json({ success: true, data: user, token });
  } catch (error) {
    console.log(error);
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

  const user = await User.findOne({ email });
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
  console.log(isPasswordCorrect);

  res.json({ email, password });
};

export const logout = (req: IUserInfoRequest, res: Response) => {
  const {
    body: { email },
  } = req;
  res.send({ email });
};
