import { TASK_TITLE_REQUIRED_ERROR_MESSAGE } from '@constants';
import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';

const TaskSchema = new Schema({
  title: {
    type: String,
    required: [true, TASK_TITLE_REQUIRED_ERROR_MESSAGE],
  },
  description: String,
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
});

export interface TaskModel {
  title: string;
  description: string;
  _id: ObjectId;
  userId: ObjectId;
  //   dueDate: Date
  //   status: string
  //   priority: string
}

export default model('Task', TaskSchema);
