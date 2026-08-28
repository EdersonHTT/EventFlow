import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Role } from "./role/Role";

@Entity("users")
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 100 })
    email: string;

    @Column({ type: "enum", enum: Role, default: Role.user })
    roles: Role;

    @Column({ length: 11, unique: true })
    Cpf: string;
}