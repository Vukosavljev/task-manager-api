import { body } from 'express-validator';
import {
  HTTP_STATUS_CODES,
  INVALID_EMAIL_OR_PASSWORD_ERROR_MESSAGE,
  PASSWORD_MIN_LENGTH_ERROR_MESSAGE,
} from '@constants';
import { User } from '@models';
import { HttpException } from '@types';

export const passwordShape = body('password')
  .isLength({ min: 8 })
  .withMessage(PASSWORD_MIN_LENGTH_ERROR_MESSAGE);

export const passwordMatch = body('password').custom(
  async (password: string, { req }) => {
    const user = await User.findOne({ email: req.body.email }).select(
      '+password'
    );

    if (!user)
      throw new HttpException(
        INVALID_EMAIL_OR_PASSWORD_ERROR_MESSAGE,
        HTTP_STATUS_CODES.UNAUTHORIZED
      );

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect)
      throw new HttpException(
        INVALID_EMAIL_OR_PASSWORD_ERROR_MESSAGE,
        HTTP_STATUS_CODES.UNAUTHORIZED
      );
  }
);
