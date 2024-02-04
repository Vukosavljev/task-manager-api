import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Document, Schema, model } from 'mongoose';
import validator from 'validator';

const userSchema = new Schema({
  name: { type: String, required: [true, 'Please enter your name.'] },
  email: {
    type: String,
    required: [true, 'Please enter your email.'],
    unique: true,
    validate: [validator.isEmail, 'Please enter valid email address.'],
  },
  password: {
    type: String,
    required: [true, 'Please enter your password.'],
    minLength: [8, 'Your password must be at least 8 characters long.'],
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
