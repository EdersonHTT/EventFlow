import { Request, Response } from "express";
import { TicketService } from "../services/TicketService";
import { TicketStatus } from "../models/Ticket";

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

    async check(req: Request, res: Response) {
        const ticket = await this.ticketService.check(Number(req.params.id));
        return res.status(200).json(ticket);
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        await this.ticketService.delete(Number(id));

        return res.status(202).json({ message: "Ticket deletado com sucesso" });
    }

    async listAll(req: Request, res: Response) {
        const authenticatedUser = (req as any).user;
        const userId = authenticatedUser?.roles === 2 ? authenticatedUser.id : undefined;
        const tickets = await this.ticketService.listAll(userId);
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
        const tickets = await this.ticketService.listByStatus(status as TicketStatus);
        return res.status(200).json(tickets);
    }
}
