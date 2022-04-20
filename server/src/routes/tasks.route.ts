import { body } from "express-validator";
import { Request, Response, Router } from "express";
import validate from "../middleware/validate";

export const tasks = Router();
