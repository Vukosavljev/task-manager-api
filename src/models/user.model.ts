import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Document, Schema, model } from 'mongoose';
import validator from 'validator';
import {
  EMAIL_EXIST_ERROR_MESSAGE,
  EMAIL_REQUIRED_ERROR_MESSAGE,
  EMAIL_VALIDITY_ERROR_MESSAGE,
  USER_NAME_REQUIRED_ERROR_MESSAGE,
  PASSWORD_MIN_LENGTH_ERROR_MESSAGE,
} from '../constants';
import { JWTPayload } from '../types';

const userSchema = new Schema({
  name: { type: String, required: [true, USER_NAME_REQUIRED_ERROR_MESSAGE] },
  email: {
    type: String,
    required: [true, EMAIL_REQUIRED_ERROR_MESSAGE],
    unique: [true, EMAIL_EXIST_ERROR_MESSAGE],
    validate: [validator.isEmail, EMAIL_VALIDITY_ERROR_MESSAGE],
  },
  password: {
    type: String,
    required: [true, PASSWORD_MIN_LENGTH_ERROR_MESSAGE],
    minLength: [8, PASSWORD_MIN_LENGTH_ERROR_MESSAGE],
    select: false,
  },
});

userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJwtToken = function () {
  const token: JWTPayload = {
    id: this._id,
  };
  return jwt.sign(token, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION_TIME,
  });
};

userSchema.methods.comparePassword = async function (enteredPassword: string) {
  return bcrypt.compare(enteredPassword, this.password);
};

export interface UserModel extends Document {
  name: string;
  email: string;
  password: string;
  getJwtToken: () => string;
  comparePassword: (...args: [string]) => Promise<boolean>;
}
export default model<UserModel>('User', userSchema);
