import { AppDataSource } from '../data-source';
import { trucks } from '../entity/trucks';

export class TrucksService {

    private trucksRepository = AppDataSource.getRepository(trucks);

    async findAll() {

        return await this.trucksRepository.find({
            relations: {
                repairs: true,
                truckTrips: true
            }
        });
    }

    async findById(truckId: number) {

        return await this.trucksRepository.findOne({
            where: {
                truckId
            }, relations: {
                repairs: true,
                truckTrips: true,
            }
        });
    }

    async create(trucksData: trucks) {
        const truck = this.trucksRepository.create(trucksData);

        return await this.trucksRepository.save(truck);
    }

    async update(truckId: number, trucksData: Partial<trucks>) {
        let truck = await this.findById(truckId);
        if (!truck) return;
        Object.assign(truck, trucksData);

        return await this.trucksRepository.save(truck);
    }

    async delete(truckId: number) {

        return await this.trucksRepository.delete(truckId);
    }
}
