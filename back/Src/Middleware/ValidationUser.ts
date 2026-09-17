import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";
import { userCreateSchema } from "../validators/UserValidator";
import { validateRequest } from "./ValidateRequest";

export function validateUser(schema: ZodType = userCreateSchema) {
    return validateRequest(schema);
}
