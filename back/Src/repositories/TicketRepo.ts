import { AppDataSource } from "../config/DataSource";
import { Ticket } from "../models/Ticket";

export class TicketRepo {
    private ticketRepository = AppDataSource.getRepository(Ticket);

    async findAll() {
        return await this.ticketRepository.find({
            relations: { event: true }
        });
    }

    async findById(id: number) {
        return await this.ticketRepository.findOne({
            where: { id },
            relations: { event: true }
        });
    }

    async findByEvent(eventId: number) {
        return await this.ticketRepository.find({
            where: { event: { id: eventId } },
            relations: { event: true }
        });
    }

    async findByStatus(status: string) {
        return await this.ticketRepository.find({
            where: { status },
            relations: { event: true }
        });
    }

    async create(ticket: Partial<Ticket>) {
        const newTicket = this.ticketRepository.create(ticket);
        return await this.ticketRepository.save(newTicket);
    }

    async update(id: number, ticket: Partial<Ticket>) {
        await this.ticketRepository.update(id, ticket);
        return await this.findById(id);
    }

    async delete(id: number) {
        await this.ticketRepository.delete(id);
        return await this.findById(id);
    }
}
