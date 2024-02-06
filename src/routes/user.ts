import { Router } from 'express';
import { login, logout, register } from '../controllers';
import { body } from 'express-validator';
import {
  EMAIL_REQUIRED_ERROR_MESSAGE,
  EMAIL_VALIDITY_ERROR_MESSAGE,
  NAME_REQUIRED_ERROR_MESSAGE,
  PASSWORD_MIN_LENGTH_ERROR_MESSAGE,
} from '../constants';

const router = Router();

router.post(
  '/register',
  body('name').notEmpty().withMessage(NAME_REQUIRED_ERROR_MESSAGE),
  body('email')
    .isEmail()
    .withMessage(EMAIL_VALIDITY_ERROR_MESSAGE)
    .notEmpty()
    .withMessage(EMAIL_REQUIRED_ERROR_MESSAGE),
  body('password')
    .isLength({ min: 8 })
    .withMessage(PASSWORD_MIN_LENGTH_ERROR_MESSAGE)
    .custom((val, a) => {
      console.log({ val }, a);
      return true;
    }),
  register
);
router.post('/login', login);
router.post('/logout', logout);

export default router;
