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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function fetchUserFromEmail(email: string): User {
  // TODO implement stub
  return {
    email: "a@b.com",
    id: "753175031467520364",
    password_digest: "ahoetunsaoehutnsmeaosuhao",
  };
}

/**
 * Retrieves a user session.
 *
 * Request body
 * empty
 *
 * Response body
 * 200
 * An empty body if the user dose not exist
 * A body with a 'user_id' field if they do exist
 */
app.get("/api/session", (req, res) => {
  return res
    .status(200)
    .json(req.session.user_id ? { user_id: req.session.user_id } : {});
});

/**
 * Creates a new session given an email and password.
 *
 * Request body
 * email The users email
 * password The users password
 *
 * Response body
 * 200
 *  user_id The id of the user just logged in as.
 * 400
 *  errors An array of error objects describing which body values are incorrect.
 * 422
 *  error A string error message detailing why login was not successful.
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

    const { email, password } = req.body as Record<string, string>;
    const User = fetchUserFromEmail(email);
    if (User && bcrypt.compareSync(password, User.password_digest)) {
      req.session.user_id = User.id;
      return res.status(200).json({ user_id: User.id });
    } else {
      return res.status(422).json({ error: "Incorrect email or password." });
    }
  }
);

/**
 * Ends a user session.
 *
 * Request body
 * empty
 *
 * Response body
 * 200
 * empty
 */
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
