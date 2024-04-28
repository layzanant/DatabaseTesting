import { AppDataSource } from "../../data-source";
import { truckTrips } from "../../entity/truckTrips";
import { UserRole } from "../../entity/employees";
import { moockRepoFunctions } from "../mockRepoFunctions";
import { TruckTripsService } from "../../services/TruckTripsService";
import { employees } from "../../entity/employees";
import { trucks } from "../../entity/trucks";
import { shipments } from "../../entity/shipments";
import { drivers } from "../../entity/drivers";

(AppDataSource.getRepository as jest.Mock) = jest.fn(() => moockRepoFunctions);

describe('TruckTrips unit testing', () => {
    let truckTripsService: TruckTripsService;

    beforeEach(() => {
        jest.clearAllMocks();
        truckTripsService = new TruckTripsService();
    });

    it('should create a truckTrip', async () => {
        const truckTrip: truckTrips = {
            tripId: 1,
            routeFrom: 'Toronto',
            routeTo: 'California',
            trucks: new trucks(),
            shipments: new shipments(),
            driver1: new drivers(),
            driver2: new drivers(),
        };
        delete truckTrip.tripId;

        moockRepoFunctions.save.mockResolvedValue(truckTrip);

        const newTruckTrip = await truckTripsService.create(truckTrip);
        expect(newTruckTrip).toEqual(truckTrip);
    });

    it('should return all truckTrips', async () => {
        const truckTripsList: truckTrips[] = [new truckTrips(), new truckTrips(), new truckTrips()];
        moockRepoFunctions.find.mockResolvedValue(truckTripsList);
        const newTruckTripsList = await truckTripsService.findAll();
        expect(newTruckTripsList).toHaveLength(3);
    });

    it('should retunrn an truckTrip by id', async () => {
        const truckTrip = new truckTrips();
        truckTrip.tripId = 1;
        moockRepoFunctions.findOne.mockResolvedValue(truckTrip);
        const truckTripRes = await truckTripsService.findById(1);
        expect(truckTripRes).toEqual(truckTrip);
        expect(moockRepoFunctions.findOne).toHaveBeenCalledTimes(1);
    });


    it('should update an truckTrip', async () => {
        const truckTrip: truckTrips = {
            tripId: 1,
            routeFrom: 'Toronto',
            routeTo: 'California',
            trucks: new trucks(),
            shipments: new shipments(),
            driver1: new drivers(),
            driver2: new drivers(),
        };
        moockRepoFunctions.findOne.mockResolvedValue(truckTrip);
        moockRepoFunctions.save.mockResolvedValue(truckTrip);

        const updatedTruckTrip = await truckTripsService.update(truckTrip.tripId, {
            routeFrom: 'Calgary',
        });
        expect(updatedTruckTrip).toEqual(truckTrip);
        expect(updatedTruckTrip.routeFrom).toBe('Calgary');
        expect(moockRepoFunctions.save).toHaveBeenCalledWith(truckTrip);
    });

    it('should delete an truckTrip', async () => {
        const tripId = 1;
        await truckTripsService.delete(tripId);
        expect(moockRepoFunctions.delete).toHaveBeenCalledWith(tripId);
    });
});
