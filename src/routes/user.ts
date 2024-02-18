import { Router } from 'express';
import {
  forgotPassword,
  login,
  logout,
  register,
  remove,
  resetPassword,
} from '@controllers';
import {
  loginEmailValidators,
  nameValidators,
  passwordValidators,
  registerEmailValidators,
} from '@validators';

const router = Router();

router.post(
  '/register',
  [nameValidators, registerEmailValidators, passwordValidators],
  register
);
router.post('/login', [loginEmailValidators, passwordValidators], login);
router.post('/logout', logout);
router.delete('/remove', [loginEmailValidators, passwordValidators], remove);
router.post('/forgot-password', [loginEmailValidators], forgotPassword);
router.post('/reset-password/:token', [passwordValidators], resetPassword);

export default router;
