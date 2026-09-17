import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany
} from "typeorm";

import { Location } from "./Location";
import { Ticket } from "./Ticket";
import { User } from "./User";

@Entity("events")
export class Event {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 150 })
    name: string;

    @Column("text")
    description: string;

    @Column({ type: "date" })
    date: Date;

    @Column({ type: "time" })
    time: string;

    @Column("decimal", { precision: 10, scale: 2 })
    ticketPrice: number;

    @ManyToOne(() => Location, location => location.events, { nullable: false, onDelete: "CASCADE" })
    location: Location;

    @ManyToOne(() => User, user => user.events, { nullable: false, onDelete: "CASCADE" })
    user: User;

    @OneToMany(() => Ticket, ticket => ticket.event, {
        cascade: true
    })
    tickets: Ticket[];
}