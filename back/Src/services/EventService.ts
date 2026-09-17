import { Event } from "../models/Event";
import { EventRepo } from "../repositories/EventRepo";

export class EventService {
    private eventRepo = new EventRepo();

    async listEvents(userId?: number) {
        return userId ? await this.eventRepo.findByUser(userId) : await this.eventRepo.findAll();
    }

    async listEventById(id: number) {
        const event = await this.eventRepo.findById(id);

        if (!event) {
            throw new Error("Event not found");
        }

        return event;
    }

    async listEventByName(name: string) {
        const event = await this.eventRepo.findByName(name);

        if (!event) {
            throw new Error("Event not found");
        }

        return event;
    }
    
    async listEventsByLocation(locationId: number) {
        return await this.eventRepo.findByLocation(locationId);
    }

    async create(name: string, description: string, date: Date, time: string, ticketPrice: number, categoryId: number, locationId: number, userId: number) {
        const eventAlreadyExists = await this.eventRepo.findByName(name);

        if (eventAlreadyExists) {
            throw new Error("Evento já cadastrado");
        }

        const event = await this.eventRepo.create({
            name,
            description,
            date,
            time,
            ticketPrice,
            location: { id: locationId } as Event["location"],
            user: { id: userId } as Event["user"]
        });

        return event;
    }

    async update(id: number, name: string, description: string, date: Date, time: string, ticketPrice: number, categoryId: number, locationId: number, userId?: number) {
        const event = await this.eventRepo.findById(id);

        if (!event) {
            throw new Error("Event not found");
        }

        if (userId && event.user?.id !== userId) {
            throw new Error("Você só pode editar seus próprios eventos");
        }

        const eventAlreadyExists = await this.eventRepo.findByName(name);

        if (eventAlreadyExists && eventAlreadyExists.id !== id) {
            throw new Error("Evento já cadastrado");
        }

        const updatedEvent = await this.eventRepo.update(id, {
            name,
            description,
            date,
            time,
            ticketPrice,
            location: { id: locationId } as Event["location"]
        });

        return updatedEvent;
    }

    async delete(id: number, userId?: number) {
        const event = await this.eventRepo.findById(id);

        if (!event) {
            throw new Error("Event not found");
        }

        if (userId && event.user?.id !== userId) {
            throw new Error("Você só pode deletar seus próprios eventos");
        }

        await this.eventRepo.delete(id);

        return { message: "Event deleted successfully" };
    }
}
