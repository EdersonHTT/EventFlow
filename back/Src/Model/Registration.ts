import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne
} from "typeorm";

import { User } from "./User";
import { Event } from "./Event";

@Entity("registrations")
export class Registration {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    registrationDate: Date;

    @ManyToOne(() => User, user => user.registrations, {
        onDelete: "CASCADE"
    })
    user: User;

    @ManyToOne(() => Event, event => event.registrations, {
        onDelete: "CASCADE"
    })
    event: Event;
}