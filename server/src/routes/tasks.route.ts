import { body } from "express-validator";
import { Request, Response, Router } from "express";
import validate from "../middleware/validate";
import { checkUserID } from "../models/users";
import { createTask } from "../models/tasks";

export const tasks = Router();

tasks.post(
  "/",
  validate([
    body("info_type").exists(),
    body("assignee_id").isInt(),
    body("due_date").isDate(),
    body("created_date").isDate(),
    body("info").exists(),
  ]),
  async (req: Request, res: Response) => {
    try {
      if (await checkUserID(req.body.assignee_id) && req.session.user_id) {
        req.body.assigner_id = parseInt(req.session.user_id);
        const addedTask = await createTask(req.body);
        return res.status(200).json(addedTask);
      }
      else {
        return res.status(422).json({ error: "Invalid Assigner or Assignee" });
      }
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  }
);
