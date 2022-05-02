import { body, CustomValidator, Meta } from "express-validator";
import { Request, Response, Router } from "express";
import validate from "../middleware/validate";
import { checkUserID } from "../models/users";
import {
  createTask,
  doesTaskExist,
  updateTask,
  doesUserExist,
} from "../models/tasks";

export const tasks = Router();

const INFO_TYPES = [
  "performance_review_requests",
  "time_off_requests",
  "training_assignments",
];

const TASK_INFO_VALIDATOR: CustomValidator = (value, meta) => {
  return true;
};

const USER_EXISTS_VALIDATOR: CustomValidator = (value, meta) => {
  return true;
};

const TASK_EXISTS_VALIDATOR: CustomValidator = (value, meta) => {
  return true;
};

tasks.post(
  "/",
  validate([
    body("info_type").isIn(INFO_TYPES),
    body("assignee_id").isInt(),
    body("due_date").isDate(),
    body("created_date").isDate(),
    body("info").isObject().custom(TASK_INFO_VALIDATOR),
    body("assignee_id").isInt().custom(USER_EXISTS_VALIDATOR),
  ]),
  async (req: Request, res: Response) => {
    try {
      return res.status(200).json(await createTask(req.body));
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  }
);

tasks.put(
  "/:id",
  validate([
    body("id").isInt().custom(TASK_EXISTS_VALIDATOR),
    body("info_type").isAscii().isIn(INFO_TYPES),
    body("assigner_id").isInt().custom(USER_EXISTS_VALIDATOR),
    body("assignee_id").isInt().custom(USER_EXISTS_VALIDATOR),
    body("due_date").isDate(),
    body("created_date").isDate(),
    body("info").isObject().custom(TASK_INFO_VALIDATOR),
  ]),
  async (req: Request, res: Response) => {
    const {
      id,
      info_type,
      info_id,
      info_attributes,
      assigner_id,
      assignee_id,
      due_date,
      created_date,
    } = req.body;
    try {
      const taskInfo = {
        id,
        info_type,
        info_id,
        info_attributes,
        assigner_id,
        assignee_id,
        due_date,
        created_date,
      };

      return res.status(200).json(await updateTask(taskInfo));
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  }
);
