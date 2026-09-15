import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";
import { userCreateSchema } from "../validators/UserValidator";

export function validateUser(schema: ZodType = userCreateSchema) {
    return validateRequest(schema);
}

export function validateRequest(schema: ZodType) {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                message: "Dados inválidos.",
                errors: result.error.issues
            });
        }

        req.body = result.data;
        next();
    };
}
