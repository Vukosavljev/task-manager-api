import { Task } from "models/task";

const tasks: Task[] = [];

export const getTasks = (req, res) => {
  console.log(tasks);
  res.status(200).json({
    success: true,
    tasks,
  });
};

export const createTask = (req, res) => {
  const { task } = req.body;
  tasks.push(task);
  res.status(200).json({
    success: true,
    tasks,
  });
};

export const updateTask = (req, res) => {
  const {
    body: { task },
    params: { id },
  } = req;
  console.log(task, id);
  res.status(200).json({
    success: true,
    tasks,
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
