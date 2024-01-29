import { Task, TaskModel } from "../models/task.model";

export const getTasks = (_, res) => {
  Task.fetchAll().then((taskResponse: TaskModel[]) => {
    res.status(200).json({
      success: true,
      tasks: taskResponse,
    });
  });
};

export const getTask = (req, res) => {
  const {
    params: { id },
  } = req;
  Task.findById(id).then((taskResponse: TaskModel[]) => {
    res.status(200).json({
      success: true,
      tasks: taskResponse,
    });
  });
};

export const createTask = (req, res) => {
  const {
    task: { title, description },
  } = req.body;

  new Task(title, description).save().then((creationResponse) => {
    res.status(201).json({
      success: true,
      createdTaskId: creationResponse.insertedId,
    });
  });
};

export const updateTask = (req, res) => {
  const {
    body: {
      task: { title, description },
    },
    params: { id },
  } = req;

  new Task(title, description, id).save().then((updatedTask: TaskModel) => {
    res.status(200).json({
      success: true,
      updatedTask,
    });
  });
};

export const deleteTask = (req, res) => {
  const {
    params: { id },
  } = req;

  Task.delete(id).then((deleteResponse) => {
    res.status(200).json({
      success: true,
      message: deleteResponse.deletedCount,
    });
  });
};
