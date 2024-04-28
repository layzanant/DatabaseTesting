import { AppDataSource } from '../data-source';
import { truckTrips } from '../entity/truckTrips';

export class TruckTripsService {

    private truckTripsRepository = AppDataSource.getRepository(truckTrips);

    async findAll() {

        return await this.truckTripsRepository.find({
            relations:
            {
                trucks: true,
                shipments: true,
                driver1: true,
                driver2: true
            }
        });
    }

    async findById(tripId: number) {

        return await this.truckTripsRepository.findOne({
            where: {
                tripId
            }, relations: {
                trucks: true,
                shipments: true,
                driver1: true,
                driver2: true
            }
        });
    }

    async create(truckTripsData: truckTrips) {
        const truckTrip = this.truckTripsRepository.create(truckTripsData);

        return await this.truckTripsRepository.save(truckTrip);
    }

    async update(truckTripId: number, truckTripsData: Partial<truckTrips>) {
        let truckTrip = await this.findById(truckTripId);
        if (!truckTrip) return;
        Object.assign(truckTrip, truckTripsData);

        return await this.truckTripsRepository.save(truckTrip);
    }

    async delete(truckTripId: number) {

        return await this.truckTripsRepository.delete(truckTripId);
    }
}
