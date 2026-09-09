import { NextFunction, Request, Response } from "express"

export const roleMiddleware = (roles: number[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        console.log("Role Middleware - User Role:", (req as any).user);
        if(roles.includes((req as any).user.roles)) {
            next()
        } else {
            return res.status(403).json({
                message: "Acesso negado."
            })
        }
    }   
}