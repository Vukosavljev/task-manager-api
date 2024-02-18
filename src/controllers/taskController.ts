import { Response } from 'express';
import {
  IUserInfoRequest,
  RequestCreateTaskBody,
  RequestTaskParams,
} from '@types';
import { Task } from '@models';

export const getTasks = async (req: IUserInfoRequest, res: Response) => {
  const task = await Task.find({ userId: req.user._id });

  res.status(200).json({
    success: true,
    results: task.length,
    data: task,
  });
};

export const getTask = async (
  req: IUserInfoRequest<RequestTaskParams>,
  res: Response
) => {
  const {
    params: { id },
  } = req;

  const task = await Task.find({ _id: id, userId: req.user._id });
  res.status(200).json({
    success: true,
    data: task,
  });
};

export const createTask = async (
  req: IUserInfoRequest<object, object, RequestCreateTaskBody>,
  res: Response
) => {
  const { title, description } = req.body;

  const task = await Task.create({ title, description, userId: req.user });
  res.status(201).json({
    success: true,
    data: task,
  });
};

export const updateTask = async (
  req: IUserInfoRequest<RequestTaskParams>,
  res: Response
) => {
  const {
    // body: { title, description },
    params: { id },
  } = req;
  // { title, description }
  const task = await Task.find({ _id: id, userId: req.user._id });
  // What to do when we don't find task with id and userId
  console.log(task);
  res.status(200).json({
    success: true,
    data: task,
  });
};

export const deleteTask = async (
  req: IUserInfoRequest<RequestTaskParams>,
  res: Response
) => {
  const {
    params: { id },
  } = req;

  const task = await Task.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    data: task,
  });
};
