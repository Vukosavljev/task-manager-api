import path from "path";
import dotenv from "dotenv";
import express from "express";
import tasks from "./routes";

dotenv.config({ path: "./config/config.env" });
const app = express();

app.use("/api/tasks", tasks);

console.log(123);
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "./views", "404.html"));
});

const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(
    `Server is running on port ${PORT} in ${process.env.NODE_ENV} mode.`
  )
);
