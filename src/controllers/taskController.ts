import { Response } from 'express';
import {
  IUserInfoRequest,
  RequestCreateTaskBody,
  RequestTaskParams,
} from '@types';
import { Task, TaskModel } from '@models';
import { HTTP_STATUS_CODES, TASK_NOT_FOUND_ERROR_MESSAGE } from '@constants';

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

  const task = await Task.findOne({ _id: id, userId: req.user._id });
  if (!task)
    return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
      success: false,
      message: TASK_NOT_FOUND_ERROR_MESSAGE,
    });

  res.status(HTTP_STATUS_CODES.OK).json({
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
  res.status(HTTP_STATUS_CODES.CREATED).json({
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
    if (!task)
      return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: TASK_NOT_FOUND_ERROR_MESSAGE,
      });
    task.title = title;
    task.description = description;
    await task.save();
    res.status(HTTP_STATUS_CODES.OK).json({
      success: true,
      data: task,
    });
  } catch (error) {
    res.json({ success: false, error });
  }
};

export const deleteTask = async (
  req: IUserInfoRequest<RequestTaskParams>,
  res: Response
) => {
  const {
    params: { id },
  } = req;

  const task = await Task.findByIdAndDelete(id);
  res.status(HTTP_STATUS_CODES.OK).json({
    success: true,
    data: task,
  });
};
