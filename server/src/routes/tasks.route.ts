import { body } from "express-validator";
import e, { Request, Response, Router } from "express";
import validate from "../middleware/validate";
import { checkUserID } from "../models/users";
import { createTask } from "../models/tasks";

export const tasks = Router();

tasks.post(
  "/",
  validate([
    body("info_type").exists(),
    body("info_id").exists(),
    body("assigner_id").isNumeric(),
    body("assignee_id").isNumeric(),
    body("due_date").isDate(),
    body("created_date").isDate(),
    body("info").exists(),
  ]),
  async (req: Request, res: Response) => {
    try {
      if (await checkUserID(req.body.assignee_id) && await checkUserID(req.body.assigner_id)) {
        const addedTask = await createTask(req.body);
        return res.status(200).json(addedTask);
      }
      else {
        return res.status(422).json({ error: "Incorrect Assigner or Assignee" });
      }
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  }
);
