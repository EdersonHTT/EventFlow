import { NextFunction, Request, Response } from "express"
import { verifyToken } from "../utils/jwt"


export function authMiddleware(req: Request, res: Response, next: NextFunction) {

    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({
            message: "Token não fornecido."
        })
    }

    const parts = authHeader.split(" ")

    if (parts.length !== 2) {
        return res.status(401).json({
            message: "Token mal formatado."
        })
    }

    const [scheme, token] = parts


    if (scheme !== "Bearer") {
        return res.status(401).json({
            message: "Formato do token inválido."
        })
    }

  
    const decoded = verifyToken(token)

    if (!decoded) {
        return res.status(401).json({
            message: "Token inválido ou expirado."
        })
    }


    (req as any).user = decoded


    next()
}
