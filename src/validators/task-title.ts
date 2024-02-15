import { TASK_TITLE_REQUIRED_ERROR_MESSAGE } from '../constants';
import { body } from 'express-validator';

export const titleValidators = body('title')
  .trim()
  .notEmpty()
  .withMessage(TASK_TITLE_REQUIRED_ERROR_MESSAGE);
