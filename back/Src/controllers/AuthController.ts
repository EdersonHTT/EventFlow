import { UserService } from "../services/UserService";
import { Request, Response } from "express";

export class AuthController {
    private userService = new UserService();

    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        const userLogged = await this.userService.login(email, password);

        return res.status(200).json(userLogged);
    }
}