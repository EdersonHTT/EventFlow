import { Role } from "../models/role/Role";
import { User } from "../models/User";
import { UserRepo } from "../repositories/UserRepo";
import { hashPassword } from "../utils/bcrypt";
import { generateToken } from "../utils/jwt";

function removePassword(user: any) {
    const { password, ...userSafe } = user;

    return userSafe;
}

export class UserService {
    private userRepo = new UserRepo();

    async listUsers() {
        const users = await this.userRepo.findAll();
        return users.map(user => removePassword(user));
    }

    async listUserById(id: number) {
        const user = await this.userRepo.findById(id);

        if (!user) {
            throw new Error("User not found");
        }

        return removePassword(user);
    }

    async listUserByEmail(email: string) {
        const user = await this.userRepo.findByEmail(email);

        if (!user) {
            throw new Error("User not found");
        }

        return removePassword(user);
    }

    async listUserByCpf(cpf: string) {
        const user = await this.userRepo.findByCpf(cpf);

        if (!user) {
            throw new Error("User not found");
        }

        return removePassword(user);
    }

    async login(email: string, password: string) {

        const user = await this.userRepo.findByEmail(email);

        if (!user) {
            throw new Error("User not found");
        }

        if (user.password !== password) {
            throw new Error("Invalid password");
        }

        const token = generateToken({ id: user.id, email: user.email });

        return {
            user: removePassword(user),
            token
        };

    }
    
    async create(name:string, email:string, cpf:string, password:string) {
        
        const validate = await this.userRepo.findByEmail(email);

        if(validate) {
            throw new Error("Email já cadastrado");
        }

        const hashedPassword = await hashPassword(password);

        const user = await this.userRepo.create({
            name,
            email,
            Cpf: cpf,
            roles: Role.user,
            password: hashedPassword
        });
        
        return removePassword(user);
    }

    async update(id: number, name: string, email: string, cpf: string) {
        const user = await this.userRepo.findById(id);

        if (!user) {
            throw new Error("User not found");
        }

        const emailAlreadyExists = await this.userRepo.findByEmail(email);

        if (emailAlreadyExists && emailAlreadyExists.id !== id) {
            throw new Error("Email já cadastrado");
        }

        const cpfAlreadyExists = await this.userRepo.findByCpf(cpf);

        if (cpfAlreadyExists && cpfAlreadyExists.id !== id) {
            throw new Error("CPF já cadastrado");
        }

        const updatedUser = await this.userRepo.update(id, {
            name,
            email,
            Cpf: cpf
        });

        return removePassword(updatedUser);
    }

    async delete(id: number) {
        const user = await this.userRepo.findById(id);

        if (!user) {
            throw new Error("User not found");
        }

        await this.userRepo.delete(id);

        return { message: "User deleted successfully" };
    }

}