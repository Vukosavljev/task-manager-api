import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express, { Response } from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { IUserInfoRequest } from 'types';
import { taskRoutes, userRoutes } from './routes';

dotenv.config({ path: './config/config.env' });
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

app.use((req: IUserInfoRequest, res: Response) => {
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
