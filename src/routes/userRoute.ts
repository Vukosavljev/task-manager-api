import { Router } from 'express';
import * as UserController from '@controllers';
import {
  loginEmailValidators,
  nameValidators,
  passwordValidators,
  registerEmailValidators,
} from '@validators';
import { validate } from '@middlewares';
import { User } from '@models';

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

// Used only for unit-tests
router.post('/', async (req, res) => {
  if (process.env.NODE_ENV !== 'test') return;

  const { email } = req.body;
  const user = await User.findOne({ email });
  res.status(200).json({
    success: true,
    user,
  });
});

export default router;
