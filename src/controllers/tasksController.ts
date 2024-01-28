import { Task, TaskModel } from "../models/task.model";

const tasks: TaskModel[] = [];

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

  new Task(title, description).save().then((newTask: TaskModel) => {
    res.status(200).json({
      success: true,
      newTask,
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
  console.log(id);
  res.status(200).json({
    success: true,
    tasks,
  });
};
