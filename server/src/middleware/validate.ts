import express from "express";
import { ValidationChain, validationResult } from "express-validator";

export default function validate(validations: ValidationChain[]) {
  return async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({ errors: errors.array() });
  };
}

export function validateTask(body: any) {
  return async(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => { 
    const validations = [body("info_type").exists(), body("info_id").exists(), 
    body("assigner_id").isNumeric(), body("assignee_id").isNumeric(), 
    body("due_date").isDate(), body("created_date").isDate()];
    return await validate(validations);
  }

}