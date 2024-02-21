import bodyParser from 'body-parser';
import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';

import { errorHandler } from '@middlewares';
import { taskRoutes, userRoutes } from '@routes';
import { connectToDB } from '@utils';

config({ path: './config/config.env' });
export const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

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
