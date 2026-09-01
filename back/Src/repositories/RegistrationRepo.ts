import { AppDataSource } from "../config/DataSource";
import { Registration } from "../models/Registration";

export class RegistrationRepo {
    private registrationRepository = AppDataSource.getRepository(Registration);

    async findAll() {
        return await this.registrationRepository.find({
            relations: { user: true, event: true }
        });
    }

    async findById(id: number) {
        return await this.registrationRepository.findOne({
            where: { id },
            relations: { user: true, event: true }
        });
    }

    async findByUser(userId: number) {
        return await this.registrationRepository.find({
            where: { user: { id: userId } },
            relations: { user: true, event: true }
        });
    }

    async findByEvent(eventId: number) {
        return await this.registrationRepository.find({
            where: { event: { id: eventId } },
            relations: { user: true, event: true }
        });
    }

    async findByUserAndEvent(userId: number, eventId: number) {
        return await this.registrationRepository.findOne({
            where: {
                user: { id: userId },
                event: { id: eventId }
            },
            relations: { user: true, event: true }
        });
    }

    async create(registration: Partial<Registration>) {
        const newRegistration = this.registrationRepository.create(registration);
        return await this.registrationRepository.save(newRegistration);
    }

    async update(id: number, registration: Partial<Registration>) {
        await this.registrationRepository.update(id, registration);
        return await this.findById(id);
    }

    async delete(id: number) {
        await this.registrationRepository.delete(id);
        return await this.findById(id);
    }
}
