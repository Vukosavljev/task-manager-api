import { body } from 'express-validator';
import {
  EMAIL_EXIST_ERROR_MESSAGE,
  EMAIL_REQUIRED_ERROR_MESSAGE,
  EMAIL_VALIDITY_ERROR_MESSAGE,
} from '@constants';
import { User } from '@models';

export const uniqueEmail = body('email').custom(async (email: string) => {
  const user = await User.findOne({ email });
  if (user) return Promise.reject(EMAIL_EXIST_ERROR_MESSAGE);
});

export const emailShape = body('email')
  .trim()
  .normalizeEmail()
  .isEmail()
  .withMessage(EMAIL_VALIDITY_ERROR_MESSAGE)
  .notEmpty()
  .withMessage(EMAIL_REQUIRED_ERROR_MESSAGE);
