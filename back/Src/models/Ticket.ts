import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "./Event";

export enum TicketStatus {
    pending = "pending",
    checked = "checked"
}

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

    @Column({ type: "enum", enum: TicketStatus, default: TicketStatus.pending })
    status: TicketStatus;

    @ManyToOne(() => Event, event => event.tickets, { onDelete: "CASCADE" })
    event: Event;
}