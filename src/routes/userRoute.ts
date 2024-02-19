import { Router } from 'express';
import * as UserController from '@controllers';
import {
  loginEmailValidators,
  nameValidators,
  passwordValidators,
  registerEmailValidators,
} from '@validators';
import { validate } from '@middlewares';

const router = Router();

router.post(
  '/register',
  [nameValidators, registerEmailValidators, passwordValidators],
  validate,
  UserController.register
);
router.post(
  '/login',
  [loginEmailValidators, passwordValidators],
  validate,
  UserController.login
);
router.get('/logout', UserController.logout);
router.delete(
  '/remove',
  [loginEmailValidators, passwordValidators],
  validate,
  UserController.remove
);
router.post(
  '/forgot-password',
  [loginEmailValidators],
  validate,
  UserController.forgotPassword
);
router.post(
  '/reset-password/:token',
  [passwordValidators],
  validate,
  UserController.resetPassword
);

export default router;
