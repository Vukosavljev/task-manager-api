// import { Task, TaskModel } from "../models/task.model";

import Task from "../models/task.model";

export const getTasks = (_, res) => {
  Task.find().then((task) => {
    res.status(200).json({
      success: true,
      results: task.length,
      data: task,
    });
  });
};

export const getTask = (req, res) => {
  const {
    params: { id },
  } = req;
  Task.findById(id).then((tasks) => {
    res.status(200).json({
      success: true,
      data: tasks,
    });
  });
};

export const createTask = (req, res) => {
  const {
    task: { title, description },
  } = req.body;

  new Task({ title, description }).save().then((task) => {
    res.status(201).json({
      success: true,
      data: task,
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

  Task.findByIdAndUpdate(id, { title, description }).then((task) => {
    res.status(200).json({
      success: false,
      data: task,
    });
  });
};

export const deleteTask = (req, res) => {
  const {
    params: { id },
  } = req;

  Task.findByIdAndDelete(id).then((task) => {
    res.status(200).json({
      success: true,
      data: task,
    });
  });
};
