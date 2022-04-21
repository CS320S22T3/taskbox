import { body, CustomValidator } from 'express-validator';
import { Request, Response, Router } from "express";
import validate from "../middleware/validate";
import { checkUserID } from "../models/users";
import { Context } from "express-validator/src/context";

export const tasks = Router();


tasks.post(
    "/:id",
    validate([body("info_type").exists(), body("info_id").exists(), 
    body("assigner_id").isNumeric(), body("assignee_id").isNumeric(), 
    body("due_date").isDate(), body("created_date").isDate()]),
    async (req: Request, res: Response) => {
        return res.sendStatus(500);
    // const { info_type, assigner_id, assignee_id } = req.body("assigner_id") as Record<Number, Number>;
    // try {
    //   const user = await checkUserID(assignee_id);
    //   if (user && bcrypt.compareSync(password, user.password_digest)) {
    //     req.session.user_id = String(user.id);
    //     return res.status(200).json({ user_id: user.id });
    //   } else {
    //     return res.status(422).json({ error: "Incorrect email or password." });
    //   }
    // } catch (e) {
    //   console.log("Error while trying to find user: " + e);

    //   return res.sendStatus(500);
    // }
  }
  
)