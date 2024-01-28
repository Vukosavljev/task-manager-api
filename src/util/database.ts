import { MongoClient } from "mongodb";

let _db;

const mongoConnect = (cb) => {
  MongoClient.connect(
    "mongodb+srv://MongoDBUserTasksApi:XAPEmGU9mwUFvENK@tasks-api.qolemm3.mongodb.net/?retryWrites=true&w=majority"
  )
    .then((client) => {
      _db = client.db();
      console.log("DB Connected!");
      cb();
    })
    .catch((e) => console.log(`DB Error ${e}`));
};

export const getDB = () => {
  if (_db) return _db;
  throw "No DataBase found!";
};

export default mongoConnect;
