import { Response } from 'express';
import Task from '../models/task.model';
import { IUserInfoRequest } from 'types';

export const getTasks = async (_: IUserInfoRequest, res: Response) => {
  const task = await Task.find();

  res.status(200).json({
    success: true,
    results: task.length,
    data: task,
  });
};

export const getTask = async (req: IUserInfoRequest, res: Response) => {
  const {
    params: { id },
  } = req;

  const tasks = await Task.findById(id);
  res.status(200).json({
    success: true,
    data: tasks,
  });
};

export const createTask = async (req: IUserInfoRequest, res: Response) => {
  const {
    task: { title, description },
  } = req.body;

  const task = await Task.create({ title, description, userId: req.user });
  res.status(201).json({
    success: true,
    data: task,
  });
};

export const updateTask = async (req: IUserInfoRequest, res: Response) => {
  const {
    body: {
      task: { title, description },
    },
    params: { id },
  } = req;

  const task = await Task.findByIdAndUpdate(id, { title, description });
  res.status(200).json({
    success: false,
    data: task,
  });
};

export const deleteTask = async (req: IUserInfoRequest, res: Response) => {
  const {
    params: { id },
  } = req;

  const task = await Task.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    data: task,
  });
};
