import { Request, Response } from "express";
import { EventService } from "../services/EventService";

export class EventController {
	private eventService = new EventService();

	async listEvents(req: Request, res: Response) {
		const authenticatedUser = (req as any).user;
		const events = await this.eventService.listEvents(authenticatedUser.roles === 2 ? authenticatedUser.id : undefined);
		return res.status(200).json(events);
	}

	async listPublicEvents(req: Request, res: Response) {
		const events = await this.eventService.listEvents();
		return res.status(200).json(events);
	}

	async listEventById(req: Request, res: Response) {
		const { id } = req.params;
		const event = await this.eventService.listEventById(Number(id));
		return res.status(200).json(event);
	}

	async listEventByName(req: Request, res: Response) {
		const { name } = req.params;
		const event = await this.eventService.listEventByName((name as string));
		return res.status(200).json(event);
	}

	async listEventsByLocation(req: Request, res: Response) {
		const { locationId } = req.params;
		const events = await this.eventService.listEventsByLocation(Number(locationId));
		return res.status(200).json(events);
	}

	async create(req: Request, res: Response) {
		const { name, description, date, time, ticketPrice, categoryId, locationId } = req.body;
        const userId = (req as any).user.id;

		const newEvent = await this.eventService.create(
			name,
			description,
			new Date(date),
			time,
			Number(ticketPrice),
			Number(categoryId),
			 Number(locationId),
            Number(userId)
		);

		return res.status(201).json(newEvent);
	}

	async update(req: Request, res: Response) {
		const { id } = req.params;
		const { name, description, date, time, ticketPrice, categoryId, locationId } = req.body;

		const updatedEvent = await this.eventService.update(
			Number(id),
			name,
			description,
			new Date(date),
			time,
			Number(ticketPrice),
			Number(categoryId),
			Number(locationId),
            (req as any).user.roles === 2 ? Number((req as any).user.id) : undefined
		);

		return res.status(200).json(updatedEvent);
	}

	async delete(req: Request, res: Response) {
		const { id } = req.params;
		const response = await this.eventService.delete(
			Number(id),
			(req as any).user.roles === 2 ? Number((req as any).user.id) : undefined
		);

		return res.status(200).json(response);
	}
}
