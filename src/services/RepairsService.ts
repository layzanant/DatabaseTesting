import { AppDataSource } from '../data-source';
import { repairs } from '../entity/repairs';

export class RepairsService {

    private repairsRepository = AppDataSource.getRepository(repairs);

    async findAll() {

        return await this.repairsRepository.find({
            relations:
            {
                trucks: true,
                mechanics: true
            }
        });
    }

    async findById(repairId: number) {

        return await this.repairsRepository.findOne({
            where: {
                repairId
            }, relations: {
                trucks: true,
                mechanics: true
            }
        });
    }

    async create(repairsData: repairs) {
        const repair = this.repairsRepository.create(repairsData);

        return await this.repairsRepository.save(repair);
    }

    async update(repairId: number, repairsData: Partial<repairs>) {
        let repair = await this.findById(repairId);
        if (!repair) return;
        Object.assign(repair, repairsData);

        return await this.repairsRepository.save(repair);
    }

    async delete(repairId: number) {

        return await this.repairsRepository.delete(repairId);
    }
}
