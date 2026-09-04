import { NextFunction, Request, Response } from "express"

export const roleMiddleware = (roles: number[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if(roles.includes((req as any).user.role)) {
            next()
        } else {
            return res.status(403).json({
                message: "Acesso negado."
            })
        }
    }   
}