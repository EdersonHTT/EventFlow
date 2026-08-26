import { Role } from "./role/Role";

export class User {
    id: number = 0;
    name: string = "";
    roles: Role = Role.user;
    Cpf: string = "";
}
