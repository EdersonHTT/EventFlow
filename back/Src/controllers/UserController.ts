import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
    private userService = new UserService();

    async listUsers(req: Request, res: Response) {
        try {
            const users = await this.userService.listUsers();
            return res.status(200).json(users);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    async listUserById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await this.userService.listUserById(Number(id));
            return res.status(200).json(user);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    async listUserByEmail(req: Request, res: Response) {
        try {
            const { email } = req.params;
            const user = await this.userService.listUserByEmail(email as string);
            return res.status(200).json(user);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    async listUserByCpf(req: Request, res: Response) {
        try {
            const { cpf } = req.params;
            const user = await this.userService.listUserByCpf(cpf as string);
            return res.status(200).json(user);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            const userLogged = await this.userService.login(email, password);

            return res.status(200).json(userLogged);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const { name, email, cpf, password } = req.body;

            const newUser = await this.userService.create(name, email, cpf, password);

            return res.status(201).json(newUser);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, email, cpf } = req.body;

            const updatedUser = await this.userService.update(Number(id), name, email, cpf);

            return res.status(200).json(updatedUser);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const response = await this.userService.delete(Number(id));

            return res.status(200).json(response);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }
}
