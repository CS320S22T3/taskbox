import express from "express";
import { Sequelize } from "sequelize";
import { EXPRESS_PORT, SQL_CONNECTION_URI } from "./constants";

const sequelize = new Sequelize(SQL_CONNECTION_URI, {
  dialect: "postgres",
});

const app = express();
app.use(express.json());

app.get("/api/session", (req, res) => {
  res.send("Hello World");
});

app.post("/api/session", (req, res) => {
  res.send("Hello World");
});

app.delete("/api/session", (req, res) => {
  res.send("Hello World");
});

sequelize
  .authenticate()
  .then(async () => {
    console.log("Successfully connected to the database.");
    app.listen(EXPRESS_PORT);
  })
  .catch((rej) => console.error("Unable to connect to the database: ", rej));
