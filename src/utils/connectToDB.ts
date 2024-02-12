import mongoose from 'mongoose';

export const connectToDB = () => {
  const { MONGODB_USER_NAME, MONGODB_USER_PASSWORD } = process.env;
  return mongoose.connect(
    `mongodb+srv://${MONGODB_USER_NAME}:${MONGODB_USER_PASSWORD}@tasks-api.qolemm3.mongodb.net/?retryWrites=true&w=majority`
  );
};
