import { body } from "express-validator";
import { Request, Response, Router } from "express";
import bcrypt from "bcryptjs";

export const sessions = Router();

declare module "express-session" {
  interface SessionData {
    user_id: string;
  }
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
sessions.get("/", (req: Request, res: Response) => {
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
sessions.post(
  "/",
  body("email").isEmail().normalizeEmail(),
  body("password").trim(),
  (req: Request, res: Response) => {
    const { email, password } = req.body as Record<string, string>;
    const User = {};
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
sessions.delete("/", (req: Request, res: Response) => {
  if (req.session.user_id) {
    req.session.user_id = undefined;
  }

  return res.sendStatus(200);
});
