import { Request, Response } from "express";
import { RegistrationService } from "../services/RegistrationService";

export class RegistrationController {
    private registrationService = new RegistrationService();

    async listRegistrations(req: Request, res: Response) {
        const registrations = await this.registrationService.listRegistrations();
        return res.status(200).json(registrations);
    }

    async listRegistrationById(req: Request, res: Response) {
        const registration = await this.registrationService.listRegistrationById(Number(req.params.id));
        return res.status(200).json(registration);
    }

    async listRegistrationsByUser(req: Request, res: Response) {
        const registrations = await this.registrationService.listRegistrationsByUser(Number(req.params.userId));
        return res.status(200).json(registrations);
    }

    async listRegistrationsByEvent(req: Request, res: Response) {
        const registrations = await this.registrationService.listRegistrationsByEvent(Number(req.params.eventId));
        return res.status(200).json(registrations);
    }

    async listRegistrationByUserAndEvent(req: Request, res: Response) {
        const registration = await this.registrationService.listRegistrationByUserAndEvent(
            Number(req.params.userId),
            Number(req.params.eventId)
        );
        return res.status(200).json(registration);
    }

    async create(req: Request, res: Response) {
        const { userId, eventId } = req.body;
        const registration = await this.registrationService.create(userId, eventId);
        return res.status(201).json(registration);
    }

    async update(req: Request, res: Response) {
        const { userId, eventId } = req.body;
        const registration = await this.registrationService.update(Number(req.params.id), userId, eventId);
        return res.status(200).json(registration);
    }

    async delete(req: Request, res: Response) {
        const response = await this.registrationService.delete(Number(req.params.id));
        return res.status(200).json(response);
    }
}