import { Registration } from "../models/Registration";
import { RegistrationRepo } from "../repositories/RegistrationRepo";
import { ConflictError, NotFoundError } from "../errors";

export class RegistrationService {
    private registrationRepo = new RegistrationRepo();

    async listRegistrations() {
        return await this.registrationRepo.findAll();
    }

    async listRegistrationById(id: number) {
        const registration = await this.registrationRepo.findById(id);

        if (!registration) {
            throw new NotFoundError("Inscrição não encontrada");
        }

        return registration;
    }

    async listRegistrationsByUser(userId: number) {
        return await this.registrationRepo.findByUser(userId);
    }

    async listRegistrationsByEvent(eventId: number) {
        return await this.registrationRepo.findByEvent(eventId);
    }

    async listRegistrationByUserAndEvent(userId: number, eventId: number) {
        const registration = await this.registrationRepo.findByUserAndEvent(userId, eventId);

        if (!registration) {
            throw new NotFoundError("Inscrição não encontrada");
        }

        return registration;
    }

    async create(userId: number, eventId: number) {
        const registrationAlreadyExists = await this.registrationRepo.findByUserAndEvent(userId, eventId);

        if (registrationAlreadyExists) {
            throw new ConflictError("Usuário já inscrito neste evento");
        }

        return await this.registrationRepo.create({
            user: { id: userId } as Registration["user"],
            event: { id: eventId } as Registration["event"]
        });
    }

    async update(id: number, userId: number, eventId: number) {
        await this.listRegistrationById(id);

        const registrationAlreadyExists = await this.registrationRepo.findByUserAndEvent(userId, eventId);

        if (registrationAlreadyExists && registrationAlreadyExists.id !== id) {
            throw new ConflictError("Usuário já inscrito neste evento");
        }

        return await this.registrationRepo.update(id, {
            user: { id: userId } as Registration["user"],
            event: { id: eventId } as Registration["event"]
        });
    }

    async delete(id: number) {
        await this.listRegistrationById(id);
        await this.registrationRepo.delete(id);

        return { message: "Registration deleted successfully" };
    }
}