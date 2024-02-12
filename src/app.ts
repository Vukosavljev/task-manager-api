import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express, { NextFunction, Response } from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { IUserInfoRequest } from 'types';
import { taskRoutes, userRoutes } from './routes';

dotenv.config({ path: './config/config.env' });
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((_: IUserInfoRequest, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);
app.use((_: IUserInfoRequest, res: Response) => {
  res.status(404).sendFile(path.join(__dirname, './views', '404.html'));
});

const PORT = process.env.PORT;

mongoose
  .connect(
    'mongodb+srv://@tasks-api.qolemm3.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => {
    app.listen(PORT, () =>
      console.log(
        `Server is running on port ${PORT} in ${process.env.NODE_ENV} mode.`
      )
    );
  });
