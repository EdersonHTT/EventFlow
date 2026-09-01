import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany
} from "typeorm";

import { Event } from "./Event";

@Entity("categories")
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, unique: true })
    name: string;

    @OneToMany(() => Event, event => event.category)
    events: Event[];
}