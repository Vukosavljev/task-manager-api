import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Document, Schema, model } from 'mongoose';
import {
  EMAIL_REQUIRED_ERROR_MESSAGE,
  EMAIL_VALIDITY_ERROR_MESSAGE,
  NAME_REQUIRED_ERROR_MESSAGE,
  PASSWORD_MIN_LENGTH_ERROR_MESSAGE,
} from '../constants';
import validator from 'validator';

const userSchema = new Schema({
  name: { type: String, required: [true, NAME_REQUIRED_ERROR_MESSAGE] },
  email: {
    type: String,
    required: [true, EMAIL_REQUIRED_ERROR_MESSAGE],
    unique: true,
    validate: [validator.isEmail, EMAIL_VALIDITY_ERROR_MESSAGE],
  },
  password: {
    type: String,
    required: [true, PASSWORD_MIN_LENGTH_ERROR_MESSAGE],
    minLength: [8, PASSWORD_MIN_LENGTH_ERROR_MESSAGE],
    selected: false,
  },
});

userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJwtToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRATION_TIME,
    }
  );
};

export interface UserModel extends Document {
  name: string;
  email: string;
  password: string;
  getJwtToken: () => string;
}
export default model<UserModel>('User', userSchema);
