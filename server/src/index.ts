import express from "express";
import { Sequelize } from "sequelize";
import { PORT } from "./constants";

const sequelize = new Sequelize({
  dialect: "postgres",
});

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT);
