import { body } from 'express-validator';
import { TASK_TITLE_REQUIRED_ERROR_MESSAGE } from '@constants';

export const titleValidators = body('title')
  .trim()
  .notEmpty()
  .withMessage(TASK_TITLE_REQUIRED_ERROR_MESSAGE);
