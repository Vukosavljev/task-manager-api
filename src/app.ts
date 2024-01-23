import dotenv from "dotenv";
import express from "express";
import tasks from "./routes";

dotenv.config({ path: "./config/config.env" });
const app = express();

app.use("/api/tasks", tasks);

app.get("/", (req, res) => {
  res.send({ hi: "Hello" });
});

const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(
    `Server is running on port ${PORT} in ${process.env.NODE_ENV} mode.`
  )
);
