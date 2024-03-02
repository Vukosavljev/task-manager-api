import { Response } from 'express';
import mongoose from 'mongoose';
import {
  IUserInfoRequest,
  RequestCreateTaskBody,
  RequestTaskParams,
} from '@types';
import { Task, TaskModel } from '@models';

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
  req: IUserInfoRequest<RequestTaskParams, object, TaskModel>,
  res: Response
) => {
  const {
    body: { title, description },
    params: { id },
  } = req;

  try {
    const task = await Task.findOne({ _id: id, userId: req.user._id });
    console.log(task);
    if (!task) return;
    task.title = title;
    task.description = description;
    await task.save();
    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    res.json({ success: false, error });
  }
  // { title, description }
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
