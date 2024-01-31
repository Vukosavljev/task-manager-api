import { ObjectId } from "mongodb";
import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

export interface UserModel {
  name: string;
  email: string;
  _id: ObjectId;
}

export default model("User", userSchema);
