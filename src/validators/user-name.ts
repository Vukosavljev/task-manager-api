import { body } from 'express-validator';
import { USER_NAME_REQUIRED_ERROR_MESSAGE } from '@constants';

export const nameShape = body('name')
  .trim()
  .notEmpty()
  .withMessage(USER_NAME_REQUIRED_ERROR_MESSAGE);
