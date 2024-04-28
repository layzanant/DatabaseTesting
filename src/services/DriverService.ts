import { AppDataSource } from '../data-source';
import { drivers } from '../entity/drivers';

export class DriversService {

    private driversRepository = AppDataSource.getRepository(drivers);

    async findAll() {

        return await this.driversRepository.find({
            relations: {
                employees: true,
            },
        });
    }

    async findById(driverId: number) {

        return await this.driversRepository.findOne({
            where: {
                driverId,
            }, relations: {
                employees: true,
            },
        });
    }

    async create(driversData: drivers) {
        const drivers = this.driversRepository.create(driversData);

        return await this.driversRepository.save(drivers);
    }

    async update(driverId: number, driversData: Partial<drivers>) {
        let driver = await this.findById(driverId);
        if (!driver) return;
        Object.assign(driver, driversData);

        return await this.driversRepository.save(driver);
    }

    async delete(driverId: number) {

        return await this.driversRepository.delete(driverId);
    }
}
