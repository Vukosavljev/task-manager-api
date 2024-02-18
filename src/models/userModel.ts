import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Document, model, Schema } from 'mongoose';
import { isEmail } from 'validator';
import {
  EMAIL_EXIST_ERROR_MESSAGE,
  EMAIL_REQUIRED_ERROR_MESSAGE,
  EMAIL_VALIDITY_ERROR_MESSAGE,
  PASSWORD_MIN_LENGTH_ERROR_MESSAGE,
  USER_NAME_REQUIRED_ERROR_MESSAGE,
} from '@constants';
import { JWTPayload } from '@types';
import { getRandomToken, hashToken } from '@utils';

const userSchema = new Schema({
  name: { type: String, required: [true, USER_NAME_REQUIRED_ERROR_MESSAGE] },
  email: {
    type: String,
    required: [true, EMAIL_REQUIRED_ERROR_MESSAGE],
    unique: [true, EMAIL_EXIST_ERROR_MESSAGE],
    validate: [isEmail, EMAIL_VALIDITY_ERROR_MESSAGE],
  },
  password: {
    type: String,
    required: [true, PASSWORD_MIN_LENGTH_ERROR_MESSAGE],
    minLength: [8, PASSWORD_MIN_LENGTH_ERROR_MESSAGE],
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJwtToken = function () {
  const { JWT_SECRET, JWT_EXPIRATION_TIME } = process.env;
  const token: JWTPayload = {
    id: this._id,
  };

  return jwt.sign(token, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION_TIME,
  });
};

userSchema.methods.comparePassword = async function (enteredPassword: string) {
  return bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getResetPasswordToken = function () {
  const token = getRandomToken();
  this.resetPasswordToken = hashToken(token);

  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

  return token;
};

export interface UserModel extends Document {
  name: string;
  email: string;
  password: string;
  resetPasswordToken: string;
  resetPasswordExpire: Date;
  getJwtToken: () => string;
  comparePassword: (...args: [string]) => Promise<boolean>;
  getResetPasswordToken: () => string;
}
export default model<UserModel>('User', userSchema);
