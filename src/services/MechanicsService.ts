import { AppDataSource } from '../data-source';
import { mechanics } from '../entity/mechanics';

export class MechanicsService {

    private mechanicsRepository = AppDataSource.getRepository(mechanics);

    async findAll() {

        return await this.mechanicsRepository.find({
            relations:
            {
                employees: true,
                repairs: true
            }
        });
    }

    async findById(mechanicId: number) {

        return await this.mechanicsRepository.findOne({
            where: {
                mechanicId
            }, relations: {
                employees: true,
                repairs: true
            }
        });
    }

    async create(mechanicsData: mechanics) {
        const mechanic = this.mechanicsRepository.create(mechanicsData);

        return await this.mechanicsRepository.save(mechanic);
    }

    async update(mechanicId: number, mechanicsData: Partial<mechanics>) {
        let mechanic = await this.findById(mechanicId);
        if (!mechanic) return;
        Object.assign(mechanic, mechanicsData);

        return await this.mechanicsRepository.save(mechanic);
    }

    async delete(mechanicId: number) {

        return await this.mechanicsRepository.delete(mechanicId);
    }
}
