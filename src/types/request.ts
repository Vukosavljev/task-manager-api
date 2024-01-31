import { Request } from 'express';
import { UserModel } from 'models/user.model';

export interface IUserInfoRequest extends Request {
  user: UserModel;
}
