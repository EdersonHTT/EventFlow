import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("tickets")
export class Ticket {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "datetime" })
    criacao: Date;

    @Column({ type: "datetime" })
    dataFinal: Date;

    @Column({ default: false })
    ValidadeVencida: boolean;
}