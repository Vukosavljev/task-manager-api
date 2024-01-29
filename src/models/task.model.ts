import { ObjectId } from "mongodb";
import { getDB } from "../util/database";

export class Task implements TaskModel {
  title: string;
  description: string;
  _id: ObjectId;

  constructor(title, description, id?) {
    this.title = title;
    this.description = description;
    this._id = id ? new ObjectId(id) : null;
  }

  save() {
    const db = getDB().collection("tasks");
    let operation;
    if (this._id) operation = db.updateOne({ _id: this._id }, { $set: this });
    else operation = db.insertOne(this);

    return operation.catch((e) => console.log(e));
  }

  static fetchAll() {
    const db = getDB();
    return db
      .collection("tasks")
      .find()
      .toArray()
      .catch((e) => console.log(e));
  }

  static findById(taskId: string) {
    const db = getDB();
    return db
      .collection("tasks")
      .find({ _id: new ObjectId(taskId) })
      .next()
      .catch((e) => console.log(e));
  }

  edit(taskId: string) {
    const db = getDB();
    return db
      .collection("tasks")
      .find({ _id: new ObjectId(taskId) })
      .next()
      .catch((e) => console.log(e));
  }

  static delete(taskId: string) {
    const db = getDB();
    return db
      .collection("tasks")
      .deleteOne({ _id: new ObjectId(taskId) })
      .catch((e) => console.log(e));
  }
}

export interface TaskModel {
  title: string;
  description: string;
  _id: ObjectId;
  // userId: string;
  //   dueDate: Date
  //   status: string
  //   priority: string
}
