import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";

export function errorHandler(err: Error | AppError, req: Request, res: Response, next: NextFunction) {
   
    console.error(err.message);

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message
        });
    }

    return res.status(500).json({
        message: "Erro interno do servidor"
    });
}
