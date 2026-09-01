import { AppDataSource } from "../config/DataSource";
import { Event } from "../models/Event";

export class EventRepo {
    private eventRepository = AppDataSource.getRepository(Event);

    async findAll() {
        return await this.eventRepository.find({
            relations: { category: true, location: true, registrations: true, tickets: true }
        });
    }

    async findById(id: number) {
        return await this.eventRepository.findOne({
            where: { id },
            relations: { category: true, location: true, registrations: true, tickets: true }
        });
    }

    async findByName(name: string) {
        return await this.eventRepository.findOne({
            where: { name },
            relations: { category: true, location: true, registrations: true, tickets: true }
        });
    }

    async findByCategory(categoryId: number) {
        return await this.eventRepository.find({
            where: { category: { id: categoryId } },
            relations: { category: true, location: true, registrations: true, tickets: true }
        });
    }

    async findByLocation(locationId: number) {
        return await this.eventRepository.find({
            where: { location: { id: locationId } },
            relations: { category: true, location: true, registrations: true, tickets: true }
        });
    }

    async create(event: Partial<Event>) {
        const newEvent = this.eventRepository.create(event);
        return await this.eventRepository.save(newEvent);
    }

    async update(id: number, event: Partial<Event>) {
        await this.eventRepository.update(id, event);
        return await this.findById(id);
    }

    async delete(id: number) {
        await this.eventRepository.delete(id);
        return await this.findById(id);
    }
}
