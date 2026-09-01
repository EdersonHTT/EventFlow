import { Role } from "../model/role/Role";
import { UserRepo } from "../repositories/UserRepo";
import { hashPassword } from "../utils/bcrypt";


export class UserService {
    private userRepo = new UserRepo();
    
    async create(name:string, email:string, cpf:string, password:string) {
        
        const validate = await this.userRepo.findByEmail(email);

        if(validate) {
            throw new Error("Email já cadastrado");
        }

        const hashedPassword = await hashPassword(password);

        const user = this.userRepo.create({
            name,
            email,
            Cpf: cpf,
            roles: Role.user,
            password: hashedPassword
        });
        
        return user;
    }

}