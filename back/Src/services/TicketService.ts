import { BadRequestError, ConflictError, NotFoundError } from "../errors";
import { EventRepo } from "../repositories/EventRepo";
import { TicketRepo } from "../repositories/TicketRepo";

type TicketData = {
    buyerName: string;
    buyerEmail: string;
    price: number;
    qrCode: string;
    status?: string;
    eventId: number;
};

export class TicketService {
    private ticketRepo = new TicketRepo();
    private eventRepo = new EventRepo();

    async create(data: TicketData) {
        const { buyerName, buyerEmail, price, qrCode, status, eventId } = data;

        if (!buyerName || !buyerEmail || !qrCode || !eventId || price === undefined || price === null) {
            throw new BadRequestError("Todos os campos são obrigatórios");
        }

        if (price <= 0) {
            throw new BadRequestError("O preço deve ser maior que zero");
        }

        const event = await this.eventRepo.findById(eventId);

        if (!event) {
            throw new NotFoundError("Evento não encontrado");
        }

        const ticket = await this.ticketRepo.create({
            buyerName,
            buyerEmail,
            price,
            qrCode,
            status: status || "pending",
            event
        });

        return ticket;
    }

    async update(id: number, data: Partial<TicketData>) {
        const ticket = await this.ticketRepo.findById(Number(id));

        if (!ticket) {
            throw new NotFoundError("Ticket não encontrado");
        }

        if (data.price !== undefined && data.price <= 0) {
            throw new BadRequestError("O preço deve ser maior que zero");
        }

        const updatedTicket = await this.ticketRepo.update(Number(id), data);

        return updatedTicket;
    }

    async delete(id: number) {
        const ticket = await this.ticketRepo.findById(Number(id));

        if (!ticket) {
            throw new NotFoundError("Ticket não encontrado");
        }

        const deletedTicket = await this.ticketRepo.delete(Number(id));

        return deletedTicket;
    }

    async listAll() {
        return await this.ticketRepo.findAll();
    }

    async listById(id: number) {
        const ticket = await this.ticketRepo.findById(Number(id));

        if (!ticket) {
            throw new NotFoundError("Ticket não encontrado");
        }

        return ticket;
    }

    async listByEvent(eventId: number) {
        return await this.ticketRepo.findByEvent(Number(eventId));
    }

    async listByStatus(status: string) {
        return await this.ticketRepo.findByStatus(status);
    }
}
