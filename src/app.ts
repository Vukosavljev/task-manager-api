import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import { taskRoutes, userRoutes } from "./routes";
import mongoose from "mongoose";

dotenv.config({ path: "./config/config.env" });
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "./views", "404.html"));
});

const PORT = process.env.PORT;

mongoose
  .connect(
    "mongodb+srv://MongoDBUserTasksApi:XAPEmGU9mwUFvENK@tasks-api.qolemm3.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(PORT, () =>
      console.log(
        `Server is running on port ${PORT} in ${process.env.NODE_ENV} mode.`
      )
    );
  });
