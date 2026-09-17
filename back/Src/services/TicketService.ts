import { BadRequestError, ConflictError, NotFoundError } from "../errors";
import { EventRepo } from "../repositories/EventRepo";
import { TicketRepo } from "../repositories/TicketRepo";
import { sendTicketEmail } from "./EmailService";
import { Ticket, TicketStatus } from "../models/Ticket";

type TicketData = {
    buyerName: string;
    buyerEmail: string;
    price?: number;
    qrCode: string;
    status?: TicketStatus;
    eventId: number;
};

export class TicketService {
    private ticketRepo = new TicketRepo();
    private eventRepo = new EventRepo();

    async create(data: TicketData) {
        const { buyerName, buyerEmail, price, qrCode, status, eventId } = data;

        if (!buyerEmail || !qrCode || !eventId) {
            throw new BadRequestError("Todos os campos são obrigatórios");
        }

        const event = await this.eventRepo.findById(eventId);

        if (!event) {
            throw new NotFoundError("Evento não encontrado");
        }

        if (!event.ticketPrice || event.ticketPrice <= 0) {
            throw new BadRequestError("O evento não possui um preço de ingresso válido");
        }

        const ticket = await this.ticketRepo.create({
            buyerName: buyerName || buyerEmail.split("@")[0],
            buyerEmail,
            price: event.ticketPrice,
            qrCode,
            status: TicketStatus.pending,
            event
        });

        try {
            await sendTicketEmail(ticket, event);
        } catch (error) {
            console.error("Não foi possível enviar o e-mail do ingresso:", error);
        }

        return ticket;
    }

    async check(id: number) {
        const ticket = await this.ticketRepo.findById(Number(id));

        if (!ticket) {
            throw new NotFoundError("Ticket não encontrado");
        }

        if (ticket.status === TicketStatus.checked) {
            throw new ConflictError("Ingresso já verificado");
        }

        return await this.ticketRepo.update(Number(id), { status: TicketStatus.checked });
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

    async listAll(userId?: number) {
        return userId
            ? await this.ticketRepo.findByEventOwner(userId)
            : await this.ticketRepo.findAll();
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

    async listByStatus(status: TicketStatus) {
        return await this.ticketRepo.findByStatus(status);
    }
}
