import { AppDataSource } from "../config/DataSource";
import { User } from "../models/User";

export class UserRepo {
    private userRepository = AppDataSource.getRepository(User);

    async findAll() {
        return await this.userRepository.find();
    }

    async findById(id: number) {
        return await this.userRepository.findOne({
            where: { id }
        });
    }

    async findByEmail(email: string) {
        return await this.userRepository.findOne({
            where: { email }
        });
    }

    async findByCpf(cpf: string) {
        return await this.userRepository.findOne({
            where: { Cpf: cpf }
        });
    }

    async create(user: Partial<User>) {
        const newUser = this.userRepository.create(user);
        return await this.userRepository.save(newUser);
    }

    async update(id: number, user: Partial<User>) {
        await this.userRepository.update(id, user);
        return await this.findById(id);
    }

    async delete(id: number) {
        await this.userRepository.delete(id);
        return await this.findById(id);
    }
}