import { AppDataSource } from "../config/DataSource";
import { User } from "../model/User";

export class UserRepo {
    private userRepository = AppDataSource.getRepository(User);

    async findByEmail(email: string) {
        return await this.userRepository.findOne({
            where: { email }
        });
    }

    async create(user: Partial<User>) {
        const newUser = this.userRepository.create(user);
        return await this.userRepository.save(newUser);
    }
}