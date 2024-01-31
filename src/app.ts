import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { taskRoutes, userRoutes } from './routes';
import mongoose from 'mongoose';
import User from './models/user.model';
import { IUserInfoRequest } from 'types';

dotenv.config({ path: './config/config.env' });
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req: IUserInfoRequest, res, next) => {
  User.findOne().then((user) => {
    req.user = user;
    next();
  });
});

app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, './views', '404.html'));
});

const PORT = process.env.PORT;

mongoose
  .connect(
    'mongodb+srv://MongoDBUserTasksApi:XAPEmGU9mwUFvENK@tasks-api.qolemm3.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({ name: 'Sava', email: 'test@gmail.com' });
        user.save();
      }
    });

    app.listen(PORT, () =>
      console.log(
        `Server is running on port ${PORT} in ${process.env.NODE_ENV} mode.`
      )
    );
  });
