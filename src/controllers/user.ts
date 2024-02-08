import { Response } from 'express';
import { IUserInfoRequest } from 'types';
import User from '../models/user.model';
import { validationResult } from 'express-validator';

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
    res.status(200).json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error,
    });
  }
};

export const login = (req: IUserInfoRequest, res: Response) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      errors,
    });
  }

  res.send({ email, password });
};

export const logout = (req: IUserInfoRequest, res: Response) => {
  const {
    body: { email },
  } = req;
  res.send({ email });
};
