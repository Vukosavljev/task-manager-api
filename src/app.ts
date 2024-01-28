import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import tasks from "./routes";
import mongoConnect from "./util/database";

dotenv.config({ path: "./config/config.env" });
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/tasks", tasks);
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "./views", "404.html"));
});

const PORT = process.env.PORT;

mongoConnect(() => {
  app.listen(PORT, () =>
    console.log(
      `Server is running on port ${PORT} in ${process.env.NODE_ENV} mode.`
    )
  );
});
