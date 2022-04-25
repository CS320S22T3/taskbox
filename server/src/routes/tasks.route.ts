import { body } from 'express-validator';
import { Request, Response, Router } from "express";
import validate from "../middleware/validate";
import { checkUserID } from "../models/users";
import { createTask } from "../models/tasks"
import knex from "../pool";

export const tasks = Router();

tasks.post(
    "/",
    validate([body("info_type").exists(), body("info_id").exists(), 
    body("assigner_id").isNumeric(), body("assignee_id").isNumeric(), 
    body("due_date").isDate(), body("created_date").isDate()]),
    async (req: Request, res: Response) => {
        const { info_type, info_id, assigner_id, assignee_id, due_date, created_date } = req.body; 
        try {
            if (await checkUserID(assignee_id)) {
                const newTask = {info_type, info_id, assigner_id, assignee_id, due_date, created_date};
                const addedTask = await createTask(newTask);
                return res.status(200).json(addedTask);
            }
        } catch(e) {
            console.log(e)
            return res.sendStatus(500);
        }
    }
)

tasks.put(
    "/:id",
    validate([
        body("id").isNumeric(), //isInt(), 
        body("info_type").isAscii(), 
        body("info_id").isNumeric(), //.isInt(), 
        body("assigner_id").isNumeric(), //.isInt(), 
        body("assignee_id").isNumeric(), // .isInt(),
        body("due_date").isDate(),
        body("created_date").isDate()
    ]),
    async (req: Request, res: Response) => {
    
    }
);