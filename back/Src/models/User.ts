import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Role } from "./role/Role";
import { Event } from "./Event";

@Entity("users")
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    name: string;

    @Column({ length: 255 })
    email: string;

    @Column({ type: "enum", enum: Role, default: Role.user })
    roles: Role;

    @Column({ length: 255 })
    password: string;

    @Column({ length: 11, unique: true })
    Cpf: string;

    @OneToMany(() => Event, event => event.user, {
        cascade: true
    })
    events: Event[];
}