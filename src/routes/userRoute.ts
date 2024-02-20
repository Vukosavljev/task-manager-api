import { Router } from 'express';
import * as UserController from '@controllers';
import { emailShape, nameShape, passwordShape, uniqueEmail } from '@validators';
import { passwordMatch, userEmailExist, validate } from '@middlewares';

const router = Router();

router.post(
  '/register',
  [nameShape, emailShape, uniqueEmail, passwordShape],
  validate,
  UserController.register
);
router.post(
  '/login',
  [emailShape, passwordShape],
  validate,
  userEmailExist,
  passwordMatch,
  UserController.login
);
router.get('/logout', UserController.logout);
router.delete(
  '/remove',
  [emailShape, passwordShape],
  validate,
  userEmailExist,
  passwordMatch,
  UserController.remove
);
router.post(
  '/forgot-password',
  [emailShape],
  validate,
  UserController.forgotPassword
);
router.post(
  '/reset-password/:token',
  [passwordShape],
  validate,
  UserController.resetPassword
);

export default router;
