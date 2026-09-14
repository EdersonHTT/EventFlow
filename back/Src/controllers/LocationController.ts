import { Request, Response } from "express";
import { LocationService } from "../services/LocationService";


export class LocationController {
    private locationService = new LocationService();

    async create(req: Request, res: Response) {
        const { name, address, capacity } = req.body;
        
        const location = await this.locationService.create({ name, address, capacity });
        res.status(201).json(location);
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { name, address, capacity } = req.body;  

        const updatedLocation = await this.locationService.update(Number(id), { name, address, capacity });
        res.status(200).json(updatedLocation);
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        await this.locationService.delete(Number(id));

        res.status(202).json({ message: "Localização deletada com sucesso" });
    }

    async listAll(req: Request, res: Response) {
        const locations = await this.locationService.listAll();
        res.status(200).json(locations);
    }

    async listById(req: Request, res: Response) {
        const { id } = req.params;
        const location = await this.locationService.listById(Number(id));
        res.status(200).json(location);
    }

    async listByName(req: Request, res: Response) {
        const { name } = req.params;
        const locations = await this.locationService.listByName((name as string).toLowerCase());
        res.status(200).json(locations);
    }

}