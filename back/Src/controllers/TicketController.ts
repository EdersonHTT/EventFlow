import { Request, Response } from "express";
import { TicketService } from "../services/TicketService";

export class TicketController {
    private ticketService = new TicketService();

    async create(req: Request, res: Response) {
        const { buyerName, buyerEmail, price, qrCode, status, eventId } = req.body;

        const ticket = await this.ticketService.create({
            buyerName,
            buyerEmail,
            price,
            qrCode,
            status,
            eventId
        });

        return res.status(201).json(ticket);
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { buyerName, buyerEmail, price, qrCode, status, eventId } = req.body;

        const updatedTicket = await this.ticketService.update(Number(id), {
            buyerName,
            buyerEmail,
            price,
            qrCode,
            status,
            eventId
        });

        return res.status(200).json(updatedTicket);
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        await this.ticketService.delete(Number(id));

        return res.status(202).json({ message: "Ticket deletado com sucesso" });
    }

    async listAll(req: Request, res: Response) {
        const tickets = await this.ticketService.listAll();
        return res.status(200).json(tickets);
    }

    async listById(req: Request, res: Response) {
        const { id } = req.params;
        const ticket = await this.ticketService.listById(Number(id));
        return res.status(200).json(ticket);
    }

    async listByEvent(req: Request, res: Response) {
        const { eventId } = req.params;
        const tickets = await this.ticketService.listByEvent(Number(eventId));
        return res.status(200).json(tickets);
    }

    async listByStatus(req: Request, res: Response) {
        const { status } = req.params;
        const tickets = await this.ticketService.listByStatus(status as string);
        return res.status(200).json(tickets);
    }
}
