import { AppDataSource } from "../config/DataSource";
import { User } from "../model/User";


export class UserService {
    private userRepo = AppDataSource.getRepository(User);
    
    async create(name:string, email:string, cpf:string, password:string) {

        if(name.length <= 0 || email.length <= 0 || cpf.length <= 0 || password.length <= 0) {
            throw new Error("Dados necessários não informadas.")
        }

        
    }
}