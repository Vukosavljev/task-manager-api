import { Request } from 'express';
import { UserModel } from '@models';

export type RequestResetPasswordParams = { token: string };
export type RequestRegisterBody = {
  name: string;
  email: string;
  password: string;
};
export type RequestLoginBody = {
  email: string;
  password: string;
};
export type RequestRemoveUserBody = {
  email: string;
  password: string;
};
export type RequestForgotPasswordBody = {
  email: string;
};
export type RequestResetPasswordBody = {
  password: string;
};

export type IUserInfoRequest<
  Params = object,
  ResBody = object,
  ReqBody = object,
  ReqQuery = object,
> = Request<Params, ResBody, ReqBody, ReqQuery> & {
  user: UserModel;
};
