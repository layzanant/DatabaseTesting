import { AppDataSource } from '../data-source';
import { shipments } from '../entity/shipments';

export class ShipmentsService {

    private shipmentsRepository = AppDataSource.getRepository(shipments);

    async findAll() {

        return await this.shipmentsRepository.find({
            relations: {
                truckTrips: true
            }
        });
    }

    async findById(shipmentId: number) {

        return await this.shipmentsRepository.findOne({
            where: {
                shipmentId
            }, relations: {
                truckTrips: true,
            }
        });
    }

    async create(shipmentsData: shipments) {
        const shipment = this.shipmentsRepository.create(shipmentsData);

        return await this.shipmentsRepository.save(shipment);
    }

    async update(shipmentId: number, shipmentsData: Partial<shipments>) {
        let shipment = await this.findById(shipmentId);
        if (!shipment) return;
        Object.assign(shipment, shipmentsData);

        return await this.shipmentsRepository.save(shipment);
    }

    async delete(shipmentId: number) {

        return await this.shipmentsRepository.delete(shipmentId);
    }
}
