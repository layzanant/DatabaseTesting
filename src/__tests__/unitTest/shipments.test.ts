import { AppDataSource } from "../../data-source";
import { shipments } from "../../entity/shipments";
import { UserRole } from "../../entity/employees";
import { moockRepoFunctions } from "../mockRepoFunctions";
import { ShipmentsService } from "../../services/ShipmentsService";
import { employees } from "../../entity/employees";
import { trucks } from "../../entity/trucks";
import { mechanics } from "../../entity/mechanics";

(AppDataSource.getRepository as jest.Mock) = jest.fn(() => moockRepoFunctions);

describe('Shipments unit testing', () => {
    let shipmentsService: ShipmentsService;

    beforeEach(() => {
        jest.clearAllMocks();
        shipmentsService = new ShipmentsService();
    });

    it('should create a shipment', async () => {
        const shipment: shipments = {
            shipmentId: 1,
            customerName: 'Anant Jain',
            address: '113 Albert',
            phone1: '2222222222',
            phone2: '2233443322',
            weight: 10,
            value: 20,
            origin: 'Waterloo',
            destination: 'Toronto',
        };
        delete shipment.shipmentId;

        moockRepoFunctions.save.mockResolvedValue(shipment);

        const newShipment = await shipmentsService.create(shipment);
        expect(newShipment).toEqual(shipment);
    });

    it('should return all shipments', async () => {
        const shipmentsList: shipments[] = [new shipments(), new shipments(), new shipments()];
        moockRepoFunctions.find.mockResolvedValue(shipmentsList);
        const newShipmentsList = await shipmentsService.findAll();
        expect(newShipmentsList).toHaveLength(3);
    });

    it('should retunrn an shipment by id', async () => {
        const shipment = new shipments();
        shipment.shipmentId = 1;
        moockRepoFunctions.findOne.mockResolvedValue(shipment);
        const shipmentRes = await shipmentsService.findById(1);
        expect(shipmentRes).toEqual(shipment);
        expect(moockRepoFunctions.findOne).toHaveBeenCalledTimes(1);
    });


    it('should update an shipment', async () => {
        const shipment: shipments = {
            shipmentId: 1,
            customerName: 'Anant Jain',
            address: '113 Albert',
            phone1: '2222222222',
            phone2: '2233443322',
            weight: 10,
            value: 20,
            origin: 'Waterloo',
            destination: 'Toronto',
        };
        moockRepoFunctions.findOne.mockResolvedValue(shipment);
        moockRepoFunctions.save.mockResolvedValue(shipment);

        const updatedShipment = await shipmentsService.update(shipment.shipmentId, {
            phone1: '67899765457',
            destination: 'London',
        });
        expect(updatedShipment).toEqual(shipment);
        expect(updatedShipment.phone1).toBe('67899765457');
        expect(updatedShipment.destination).toBe('London');
        expect(moockRepoFunctions.save).toHaveBeenCalledWith(shipment);
    });

    it('should delete an shipment', async () => {
        const shipmentId = 1;
        await shipmentsService.delete(shipmentId);
        expect(moockRepoFunctions.delete).toHaveBeenCalledWith(shipmentId);
    });
});
