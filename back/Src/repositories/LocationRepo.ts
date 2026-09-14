import { AppDataSource } from "../config/DataSource";
import { Location } from "../models/Location";

export class LocationRepo {
    private locationRepository = AppDataSource.getRepository(Location);

    async listAll() {
        return await this.locationRepository.find();
    }

    async listById(id: number) {
        return await this.locationRepository.findOne({
            where: { id }
        });
    }

    async create(location: Partial<Location>) {
        const newLocation = this.locationRepository.create(location);
        return await this.locationRepository.save(newLocation);
    }

    async update(id: number, location: Partial<Location>) {
        await this.locationRepository.update(id, location);
        return await this.listById(id);
    }

    async delete(id: number) {
        await this.locationRepository.delete(id);
        return await this.listById(id);
    }
}