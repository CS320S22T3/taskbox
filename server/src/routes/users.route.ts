import { Request, Response, Router } from "express";
import { param } from "express-validator";
import validate from "../middleware/validate";
import { getAssociatedTasksForUser } from "../models/tasks";
import { getUsers } from "../models/users";

export const users = Router();

users.get("/", async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

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
