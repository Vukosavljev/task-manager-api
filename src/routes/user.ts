import { Router } from 'express';
import { login, logout, register, remove } from '../controllers';
import {
  registerEmailValidators,
  nameValidators,
  passwordValidators,
  loginEmailValidators,
} from '../validators';

const router = Router();

router.post(
  '/register',
  [nameValidators, registerEmailValidators, passwordValidators],
  register
);
router.post('/login', [loginEmailValidators, passwordValidators], login);
router.post('/logout', logout);
router.delete('/remove', [loginEmailValidators, passwordValidators], remove);

export default router;
