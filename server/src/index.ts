import express from "express";
import session from "express-session";
import { body, validationResult } from "express-validator";
import { Sequelize } from "sequelize";
import { EXPRESS_PORT, SQL_CONNECTION_URI } from "./constants";
import { User } from "./types";
import bcrypt from "bcryptjs";

const sequelize = new Sequelize(SQL_CONNECTION_URI, {
  dialect: "postgres",
});

const app = express();
app.use(express.json());
app.use(session());

declare module "express-session" {
  interface SessionData {
    user_id: string;
  }
}

app.get("/api/session", (req, res) => {
  return res
    .status(200)
    .json(req.session.user_id ? { user_id: req.session.user_id } : {});
});

/**
 * Creates a new session given an email and password.
 */
app.post(
  "/api/session",
  body("email").isEmail().normalizeEmail(),
  body("password").trim(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { password } = req.body as Record<string, string>;
    const User = {} as User; // TODO get user from database using email
    if (bcrypt.compareSync(password, User.password_digest)) {
      req.session.user_id = User.id;
      return res.status(200).json({ user_id: User.id });
    } else {
      return res.status(422).json({ errors: ["Invalid email or password."] });
    }
  }
);

app.delete("/api/session", (req, res) => {
  if (req.session.user_id) {
    req.session.user_id = undefined;
  }

  return res.status(200);
});

sequelize
  .authenticate()
  .then(async () => {
    console.log("Successfully connected to the database.");
    app.listen(EXPRESS_PORT);
  })
  .catch((rej) => console.error("Unable to connect to the database: ", rej));
