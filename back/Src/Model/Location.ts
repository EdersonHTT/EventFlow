import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany
} from "typeorm";

import { Event } from "./Event";

@Entity("locations")
export class Location {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 150 })
    name: string;

    @Column({ length: 255 })
    address: string;

    @Column()
    capacity: number;

    @OneToMany(() => Event, event => event.location)
    events: Event[];
}