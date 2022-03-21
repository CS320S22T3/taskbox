import express from "express";
import { Sequelize } from "sequelize";
import { EXPRESS_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD } from "./constants";

/*const sequelize = new Sequelize(SQL_CONNECTION_URI, {
  dialect: "postgres",
});*/
const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: "localhost"
  , dialect: "postgres"
});

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

sequelize
  .authenticate()
  .then(async () => {
    console.log("Successfully connected to the database.");
    app.listen(EXPRESS_PORT);
  })
  .catch((rej) => console.error("Unable to connect to the database: ", rej));
