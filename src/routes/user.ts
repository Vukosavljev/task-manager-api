import { Router } from 'express';
import {
  resetPassword,
  login,
  logout,
  register,
  remove,
  forgotPassword,
} from '@controllers';
import {
  registerEmailValidators,
  nameValidators,
  passwordValidators,
  loginEmailValidators,
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
router.post('/reset-password/:resetPasswordToken', resetPassword);

export default router;
