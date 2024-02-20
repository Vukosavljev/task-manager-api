import { NextFunction, Response } from 'express';
import {
  HttpException,
  IUserInfoRequest,
  RequestForgotPasswordBody,
  RequestLoginBody,
  RequestRegisterBody,
  RequestRemoveUserBody,
  RequestResetPasswordBody,
  RequestResetPasswordParams,
} from '@types';
import {
  HTTP_STATUS_CODES,
  INVALID_RESET_TOKEN_ERROR_MESSAGE,
  LOGGED_OUT_SUCCESS_MESSAGE,
  USER_DELETE_SUCCESS_MESSAGE,
  USER_WITH_EMAIL_NOT_FOUND_ERROR_MESSAGE,
} from '@constants';
import { hashToken, sendEmail, sendToken } from '@utils';
import { User } from '@models';

export const register = async (
  req: IUserInfoRequest<object, object, RequestRegisterBody>,
  res: Response
) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({ name, email, password });
    sendToken(user, 201, res);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
  }
};

export const login = async (
  req: IUserInfoRequest<object, object, RequestLoginBody>,
  res: Response
) => {
  sendToken(req.user, 200, res);
};

export const logout = async (_: IUserInfoRequest, res: Response) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({ success: true, message: LOGGED_OUT_SUCCESS_MESSAGE });
};

export const remove = async (
  req: IUserInfoRequest<object, object, RequestRemoveUserBody>,
  res: Response
) => {
  const user = req.user;

  try {
    await user.deleteOne();
    return res
      .status(200)
      .json({ success: true, message: USER_DELETE_SUCCESS_MESSAGE });
  } catch (error) {
    res.json({ success: false, error });
  }
};

export const forgotPassword = async (
  req: IUserInfoRequest<object, object, RequestForgotPasswordBody>,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user)
    return next(
      new HttpException(
        USER_WITH_EMAIL_NOT_FOUND_ERROR_MESSAGE,
        HTTP_STATUS_CODES.NOT_FOUND
      )
    );

  const resetPasswordToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get('host')}/api/users/reset-password/${resetPasswordToken}`;

  try {
    sendEmail({
      subject: 'Task Api - recovery password',
      html: `<h1>Hello dear ${user.name}</h1>
      <p>If you want to reset your password here is the link - <b>${resetUrl}</b>, if not please ignore this email.</p>`,
      to: user.email,
    });

    res
      .status(200)
      .json({ success: true, message: `Email is sent to ${user.email}` });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
  }
};

export const resetPassword = async (
  req: IUserInfoRequest<
    RequestResetPasswordParams,
    object,
    RequestResetPasswordBody
  >,
  res: Response,
  next: NextFunction
) => {
  const { password } = req.body;
  const { token } = req.params;

  const hashedToken = hashToken(token);
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user)
    return next(
      new HttpException(
        INVALID_RESET_TOKEN_ERROR_MESSAGE,
        HTTP_STATUS_CODES.BAD_REQUEST
      )
    );

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
};
