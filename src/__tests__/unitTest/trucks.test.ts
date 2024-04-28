import { AppDataSource } from "../../data-source";
import { trucks } from "../../entity/trucks";
import { UserRole } from "../../entity/employees";
import { moockRepoFunctions } from "../mockRepoFunctions";
import { TrucksService } from "../../services/TrucksService";
import { employees } from "../../entity/employees";

(AppDataSource.getRepository as jest.Mock) = jest.fn(() => moockRepoFunctions);

describe('Trucks unit testing', () => {
    let trucksService: TrucksService;

    beforeEach(() => {
        jest.clearAllMocks();
        trucksService = new TrucksService();
    });

    it('should create a truck', async () => {
        const truck: trucks = {
            truckId: 1,
            brand: 'Honda',
            load: 10,
            capacity: 20,
            year: 2019,
            numberOfRepairs: 0,
        };
        delete truck.truckId;

        moockRepoFunctions.save.mockResolvedValue(truck);

        const newTruck = await trucksService.create(truck);
        expect(newTruck).toEqual(truck);
    });

    it('should return all trucks', async () => {
        const trucksList: trucks[] = [new trucks(), new trucks(), new trucks()];
        moockRepoFunctions.find.mockResolvedValue(trucksList);
        const newTrucksList = await trucksService.findAll();
        expect(newTrucksList).toHaveLength(3);
    });

    it('should retunrn an truck by id', async () => {
        const truck = new trucks();
        truck.truckId = 1;
        moockRepoFunctions.findOne.mockResolvedValue(truck);
        const truckRes = await trucksService.findById(1);
        expect(truckRes).toEqual(truck);
        expect(moockRepoFunctions.findOne).toHaveBeenCalledTimes(1);
    });


    it('should update an truck', async () => {
        const truck: trucks = {
            truckId: 1,
            brand: 'Honda',
            load: 10,
            capacity: 20,
            year: 2019,
            numberOfRepairs: 0,
        };
        moockRepoFunctions.findOne.mockResolvedValue(truck);
        moockRepoFunctions.save.mockResolvedValue(truck);

        const updatedTruck = await trucksService.update(truck.truckId, {
            numberOfRepairs: 1,
        });
        expect(updatedTruck).toEqual(truck);
        expect(updatedTruck.numberOfRepairs).toBe(1);
        expect(moockRepoFunctions.save).toHaveBeenCalledWith(truck);
    });

    it('should delete an truck', async () => {
        const truckId = 1;
        await trucksService.delete(truckId);
        expect(moockRepoFunctions.delete).toHaveBeenCalledWith(truckId);
    });
});
