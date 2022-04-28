import { Request, Response, Router } from "express";
import { param } from "express-validator";
import validate from "../middleware/validate";
import { getAssociatedTasksForUser } from "../models/tasks";

export const users = Router();

users.get(
  "/:id/tasks",
  validate([param("id").isInt()]),
  async (req: Request, res: Response) => {
    const userId = req.params.id;

    try {
      const tasks = await getAssociatedTasksForUser(Number(userId));
      res.json(tasks);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  }
);
