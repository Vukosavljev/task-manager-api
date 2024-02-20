import bodyParser from 'body-parser';
import { config } from 'dotenv';
import express, { NextFunction, Response } from 'express';

import { IUserInfoRequest } from '@types';
import { taskRoutes, userRoutes } from '@routes';
import { connectToDB } from '@utils';
import { errorHandler } from '@middlewares';

config({ path: './config/config.env' });
export const app = express();

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
app.use(errorHandler);

(async () => {
  const { PORT, NODE_ENV } = process.env;
  await connectToDB();
  if (process.env.NODE_ENV !== 'test')
    app.listen(PORT, () =>
      console.log(`Server is running on port ${PORT} in ${NODE_ENV} mode.`)
    );
})();
