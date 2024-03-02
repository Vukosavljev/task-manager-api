import { NextFunction, Response } from 'express';
import mongoose from 'mongoose';
import { HttpException, IUserInfoRequest } from '@types';
import {
  HTTP_STATUS_CODES,
  INVALID_RESOURCE_ID_ERROR_MESSAGE,
} from '@constants';

export const validateMongoId = (
  req: IUserInfoRequest<{ id: string }>,
  _: Response,
  next: NextFunction
) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) return next();

  throw new HttpException(
    INVALID_RESOURCE_ID_ERROR_MESSAGE,
    HTTP_STATUS_CODES.BAD_REQUEST
  );
};
