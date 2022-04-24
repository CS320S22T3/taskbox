import { body } from 'express-validator';
import { Request, Response, Router } from "express";
import validate, { validateTask } from "../middleware/validate";
import { checkUserID } from "../models/users";
import knex from "knex";

export const tasks = Router();

tasks.post(
    "/",
    validate([body("info_type").exists(), body("info_id").exists(), 
    body("assigner_id").isNumeric(), body("assignee_id").isNumeric(), 
    body("due_date").isDate(), body("created_date").isDate()]),
    async (req: Request, res: Response) => {
        const { info_id, assigner_id, assignee_id, due_date, created_date } = req.body; 
        try {
            if (await checkUserID(assignee_id)) {
                console.log("valid user", await checkUserID(assignee_id))
                knex
            }
        // if (await checkUserID(assignee_id)) {
            
        //     return res.status(200)
        // }
        // else {
        //     return res.status(422).json({ error: "Incorrect assignee id" });
        // }
        } catch(e) {
            console.log("hello wrong")
        }
    }
    // try {
    //   const user = await checkUserID(assignee_id) && await ;
    //   const 
    //   if (user && bcrypt.compareSync(password, user.password_digest)) {
    //     req.session.user_id = String(user.id);
    //     return res.status(200).json({ user_id: user.id });
    //   } else {
    //     return res.status(422).json({ error: "Incorrect email or password." });
    //   }
    // } catch (e) {
    //   console.log("Error while trying to find user: " + e);

    //   return res.sendStatus(200);
    // }  
)