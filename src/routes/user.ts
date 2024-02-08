import { Router } from 'express';
import { login, logout, register } from '../controllers';
import {
  emailValidators,
  nameValidators,
  passwordValidators,
} from '../validators';

const router = Router();

router.post(
  '/register',
  [nameValidators, emailValidators, passwordValidators],
  register
);
router.post('/login', [emailValidators, passwordValidators], login);
router.post('/logout', logout);

export default router;
