import { BadRequestError } from "../errors";
import { LocationRepo } from "../repositories/LocationRepo";

type LocationData = {
    name: string;
    address: string;
    capacity: number;
};


export class LocationService {
    private locaRepo = new LocationRepo();

    async create(data: LocationData) {
        if (!data.name || !data.address || !data.capacity) {
            throw new BadRequestError("Todos os campos são obrigatórios");
        }

        const location = await this.locaRepo.create(data);
        
        return location;
    }

    async update(id: number, data: Partial<LocationData>) {
        const location = await this.locaRepo.listById(Number(id));
        
        if (!location) {
            throw new BadRequestError("Localização não encontrada");
        }
        
        const updatedLocation = await this.locaRepo.update(Number(id), data);
        
        return updatedLocation;
    }

    async delete(id: number) {
        const location = await this.locaRepo.listById(Number(id));  
        
        if (!location) {
            throw new BadRequestError("Localização não encontrada");
        }

        const deletedLocation = await this.locaRepo.delete(Number(id));
        
        return deletedLocation;
    }

    async listAll() {
        const locations = await this.locaRepo.listAll();
        return locations;
    }

    async listById(id: number) {
        const location = await this.locaRepo.listById(id);
        return location;
    }

    async listByName(name: string) {
        const location = await this.locaRepo.listAll();

        const filteredLocation = location.filter(loc => loc.name.toLowerCase().includes(name.toLowerCase()));
        
        return filteredLocation;
    }
}