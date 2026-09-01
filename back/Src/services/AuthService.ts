import { jwt } from "zod";
import { UserRepo } from "../repositories/UserRepo";

export class AuthService {
    private userRepo = new UserRepo();

    async login(email: string, password: string) {

        const user = await this.userRepo.findByEmail(email);

        if (!user) {
            throw new Error("User not found");
        }

        if (user.password !== password) {
            throw new Error("Invalid password");
        }

    }
}