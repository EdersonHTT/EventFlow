import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany
} from "typeorm";

import { Category } from "./Category";
import { Location } from "./Location";
import { Registration } from "./Registration";
import { Ticket } from "./Ticket";

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

    @ManyToOne(() => Category, category => category.events)
    category: Category;

    @ManyToOne(() => Location, location => location.events)
    location: Location;

    @OneToMany(() => Registration, registration => registration.event)
    registrations: Registration[];

    @OneToMany(() => Ticket, ticket => ticket.event)
    tickets: Ticket[];
}