import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "./Event";

@Entity("tickets")
export class Ticket {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    buyerName: string;

    @Column()
    buyerEmail: string;

    @Column("decimal")
    price: number;

    @Column()
    qrCode: string;

    @Column({ default: "pending" })
    status: string;

    @ManyToOne(() => Event, event => event.tickets)
    event: Event;
}