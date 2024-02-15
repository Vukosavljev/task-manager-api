import { USER_NAME_REQUIRED_ERROR_MESSAGE } from '@constants';
import { body } from 'express-validator';

export const nameValidators = body('name')
  .trim()
  .notEmpty()
  .withMessage(USER_NAME_REQUIRED_ERROR_MESSAGE);
