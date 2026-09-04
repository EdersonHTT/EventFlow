import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
    private userService = new UserService();

    async listUsers(req: Request, res: Response) {
        const users = await this.userService.listUsers();
        return res.status(200).json(users);
    }

    async listUserById(req: Request, res: Response) {
        const { id } = req.params;
        const user = await this.userService.listUserById(Number(id));
        return res.status(200).json(user);
    }

    async listUserByEmail(req: Request, res: Response) {
        const { email } = req.params;
        const user = await this.userService.listUserByEmail(email as string);
        return res.status(200).json(user);
    }

    async listUserByCpf(req: Request, res: Response) {
        const { cpf } = req.params;
        const user = await this.userService.listUserByCpf(cpf as string);
        return res.status(200).json(user);
    }

    async create(req: Request, res: Response) {
        const { name, email, cpf, password } = req.body;

        const newUser = await this.userService.create(name, email, cpf, password);

        return res.status(201).json(newUser);
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { name, email, cpf } = req.body;

        const updatedUser = await this.userService.update(Number(id), name, email, cpf);

        return res.status(200).json(updatedUser);
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const response = await this.userService.delete(Number(id));

        return res.status(200).json(response);
    }
}
