import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express, { Response } from 'express';
import path from 'path';
import { taskRoutes, userRoutes } from './routes';
import mongoose from 'mongoose';
import User from './models/user.model';
import { IUserInfoRequest } from 'types';

dotenv.config({ path: './config/config.env' });
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req: IUserInfoRequest, _: Response, next) => {
  User.findOne().then((user) => {
    req.user = user;
    next();
  });
});

app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

// For testing cookie
app.get('/', (req: IUserInfoRequest, res: Response) => {
  res.setHeader('Set-Cookie', 'MyExampleKey=myExampleCookieValue');
  res.send('ROOT Page for testing');
});

app.use((req: IUserInfoRequest, res: Response) => {
  res.status(404).sendFile(path.join(__dirname, './views', '404.html'));
});

const PORT = process.env.PORT;

mongoose
  .connect(
    'mongodb+srv://@tasks-api.qolemm3.mongodb.net/?retryWrites=true&w=majority'
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
