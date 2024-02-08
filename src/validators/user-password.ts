import { PASSWORD_MIN_LENGTH_ERROR_MESSAGE } from '../constants';
import { body } from 'express-validator';

export const passwordValidators = body('password')
  .isLength({ min: 8 })
  .withMessage(PASSWORD_MIN_LENGTH_ERROR_MESSAGE);
