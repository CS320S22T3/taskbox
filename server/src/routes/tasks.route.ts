import { body } from "express-validator";
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
      if ((await checkUserID(req.body.assignee_id)) && req.session.user_id) {
        req.body.assigner_id = parseInt(req.session.user_id);
        const addedTask = await createTask(req.body);
        return res.status(200).json(addedTask);
      } else {
        return res.status(422).json({ error: "Invalid Assigner or Assignee" });
      }
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  }
);

tasks.put(
  "/:id",
  validate([
    // too many validations?
    body("id").isNumeric(), //isInt(),
    body("info_type").isAscii(),
    body("info_id").isNumeric(), //.isInt(),
    body("assigner_id").isNumeric(), //.isInt(),
    body("assignee_id").isNumeric(), // .isInt(),
    body("due_date").isDate(),
    body("created_date").isDate(),
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
    } = req.body; // is req.body a k:v dictionary?
    try {
      if (
        //too many checks?
        (await doesTaskExist(id)) &&
        (await doesUserExist(assignee_id)) &&
        (await doesUserExist(assigner_id))
      ) {
        // end of if
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
        const updatedTask = await updateTask(taskInfo);
        return res.status(200).json(updatedTask);
      }
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  }
);
