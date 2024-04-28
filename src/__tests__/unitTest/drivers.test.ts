import { AppDataSource } from "../../data-source";
import { drivers } from "../../entity/drivers";
import { UserRole } from "../../entity/employees";
import { moockRepoFunctions } from "../mockRepoFunctions";
import { DriversService } from "../../services/DriverService";
import { employees } from "../../entity/employees";

(AppDataSource.getRepository as jest.Mock) = jest.fn(() => moockRepoFunctions);

describe('Drivers unit testing', () => {
    let driversService: DriversService;

    beforeEach(() => {
        jest.clearAllMocks();
        driversService = new DriversService();
    });

    it('should create a driver', async () => {
        const driver: drivers = {
            driverId: 1,
            category: "G",
            employees: new employees(),
        };
        delete driver.driverId;

        moockRepoFunctions.save.mockResolvedValue(driver);

        const newDriver = await driversService.create(driver);
        expect(newDriver).toEqual(driver);
    });

    it('should return all drivers', async () => {
        const driversList: drivers[] = [new drivers(), new drivers(), new drivers()];
        moockRepoFunctions.find.mockResolvedValue(driversList);
        const newDriversList = await driversService.findAll();
        expect(newDriversList).toHaveLength(3);
    });

    it('should retunrn an driver by id', async () => {
        const driver = new drivers();
        driver.driverId = 1;
        moockRepoFunctions.findOne.mockResolvedValue(driver);
        const driverRes = await driversService.findById(1);
        expect(driverRes).toEqual(driver);
        expect(moockRepoFunctions.findOne).toHaveBeenCalledTimes(1);
    });


    it('should update an driver', async () => {
        const driver: drivers = {
            driverId: 1,
            category: "G",
            employees: new employees(),
        };
        moockRepoFunctions.findOne.mockResolvedValue(driver);
        moockRepoFunctions.save.mockResolvedValue(driver);

        const updatedDriver = await driversService.update(driver.driverId, {
            category: 'G2',
        });
        expect(updatedDriver).toEqual(driver);
        expect(updatedDriver.category).toBe('G2');
        expect(moockRepoFunctions.save).toHaveBeenCalledWith(driver);
    });

    it('should delete an driver', async () => {
        const driverId = 1;
        await driversService.delete(driverId);
        expect(moockRepoFunctions.delete).toHaveBeenCalledWith(driverId);
    });
});
