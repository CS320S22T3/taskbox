import { body } from "express-validator";
import { Request, Response, Router } from "express";
import validate from "../middleware/validate";
import { createTask, updateTask } from "../models/tasks";

export const tasks = Router();

const INFO_TYPES = [
  "performance_review_requests",
  "time_off_requests",
  "training_assignments",
];

tasks.post(
  "/",
  validate([
    body("info_type").isIn(INFO_TYPES),
    body("assignee_id").isInt(),
    body("due_date").isDate(),
    body("created_date").isDate(),
    body("info").isObject(),
    body("assignee_id").isInt(),
  ]),
  async (req: Request, res: Response) => {
    const { assigner_id, assignee_id, due_date, info_type, info } = req.body;
    try {
      return res.status(200).json(
        await createTask(
          {
            assignee_id,
            assigner_id,
            due_date,
          },
          info_type,
          info
        )
      );
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  }
);

tasks.put(
  "/:id",
  validate([
    body("id").isInt(),
    body("assigner_id").isInt(),
    body("assignee_id").isInt(),
    body("due_date").isDate(),
    body("info").isObject(),
  ]),
  async (req: Request, res: Response) => {
    const { id, assigner_id, assignee_id, due_date, info } = req.body;
    try {
      return res.status(200).json(
        await updateTask(
          id,
          {
            assignee_id,
            assigner_id,
            due_date,
          },
          info
        )
      );
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  }
);
