import { body } from 'express-validator';
import {
  PASSWORD_MIN_LENGTH_ERROR_MESSAGE
} from '@constants';

export const passwordShape = body('password')
  .isLength({ min: 8 })
  .withMessage(PASSWORD_MIN_LENGTH_ERROR_MESSAGE);


