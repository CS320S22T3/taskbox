import { body } from "express-validator";
import { Request, Response, Router } from "express";
import bcrypt from "bcryptjs";
import validate from "../middleware/validate";
import { getUserFromEmail, getUserFromId } from "../models/users";
import knex from "knex";
import pool from "../pool";

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
sessions.get("/", async (req: Request, res: Response) => {
  try {
    const user = getUserFromId(req.session.user_id as unknown as number);
    return res.status(200).json(user);
  } catch (e) {
    console.log("Error while trying to get user: " + e);
    return res.sendStatus(500);
  }
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
 * 500
 *  empty body
 */
sessions.post(
  "/",
  validate([body("email").isEmail().normalizeEmail(), body("password").trim()]),
  async (req: Request, res: Response) => {
    const { email, password } = req.body as Record<string, string>;
    try {
      const user = await getUserFromEmail(email);
      if (user && bcrypt.compareSync(password, user.password_digest)) {
        req.session.user_id = String(user.id);
        return res.status(200).json(user);
      } else {
        return res.status(422).json({ error: "Incorrect email or password." });
      }
    } catch (e) {
      console.log("Error while trying to find user: " + e);

      return res.sendStatus(500);
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
