import { body } from 'express-validator';
import { Request, Response, Router } from "express";
import validate from "../middleware/validate";
import { checkUserID } from "../models/users";
import { createTask, checkTaskID, checkTaskType, checkTaskTypeID, updateTask, updateInfoTask} from "../models/tasks"
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
    validate([ // too many validations?
        body("id").isNumeric(), //isInt(), 
        body("info_type").isAscii(), 
        body("info_id").isNumeric(), //.isInt(), 
        body("assigner_id").isNumeric(), //.isInt(), 
        body("assignee_id").isNumeric(), // .isInt(),
        body("due_date").isDate(),
        body("created_date").isDate()
    ]),
    async (req: Request, res: Response) => {
        const requestInfo = req.body; // is req.body a k:v dictionary?
        try {
            if ( //too many checks?
                await checkTaskID(requestInfo.id) && 
                ///await checkTaskType(info_type) && 
                //await checkUserID(assigner_id) && 
                await checkUserID(requestInfo.assignee_id)
                //await checkTaskTypeID(info_id, info_type)
            ) {// end of if 
                const newTask = requestInfo;
                const updatedInfo = await updateInfoTask(newTask);
                const updatedTask = await updateTask(newTask);
                return res.status(200).json(updatedTask)
            }
        }
        catch(e) {
            console.log(e)
            return res.sendStatus(500)
        }
    }
);