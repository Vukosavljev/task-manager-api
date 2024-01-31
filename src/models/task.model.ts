import { ObjectId } from "mongodb";
import { Schema, model } from "mongoose";

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
});

export interface TaskModel {
  title: string;
  description: string;
  _id: ObjectId;
  // userId: string;
  //   dueDate: Date
  //   status: string
  //   priority: string
}

export default model("Task", TaskSchema);
