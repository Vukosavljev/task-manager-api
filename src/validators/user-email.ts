import {
  EMAIL_EXIST_ERROR_MESSAGE,
  EMAIL_REQUIRED_ERROR_MESSAGE,
  EMAIL_VALIDITY_ERROR_MESSAGE,
} from '../constants';
import User from '../models/user.model';
import { body } from 'express-validator';

export const registerEmailValidators = body('email')
  .trim()
  .normalizeEmail()
  .isEmail()
  .withMessage(EMAIL_VALIDITY_ERROR_MESSAGE)
  .notEmpty()
  .withMessage(EMAIL_REQUIRED_ERROR_MESSAGE)
  .custom(async (email: string) => {
    const user = await User.findOne({ email });
    if (user) return Promise.reject(EMAIL_EXIST_ERROR_MESSAGE);
  });

export const loginEmailValidators = body('email')
  .trim()
  .normalizeEmail()
  .isEmail()
  .withMessage(EMAIL_VALIDITY_ERROR_MESSAGE)
  .notEmpty()
  .withMessage(EMAIL_REQUIRED_ERROR_MESSAGE);
