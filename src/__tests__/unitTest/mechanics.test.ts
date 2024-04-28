import { AppDataSource } from "../../data-source";
import { mechanics } from "../../entity/mechanics";
import { UserRole } from "../../entity/employees";
import { moockRepoFunctions } from "../mockRepoFunctions";
import { MechanicsService } from "../../services/MechanicsService";
import { employees } from "../../entity/employees";

(AppDataSource.getRepository as jest.Mock) = jest.fn(() => moockRepoFunctions);

describe('Mechanics unit testing', () => {
    let mechanicsService: MechanicsService;

    beforeEach(() => {
        jest.clearAllMocks();
        mechanicsService = new MechanicsService();
    });

    it('should create a mechanic', async () => {
        const mechanic: mechanics = {
            mechanicId: 1,
            vehiclebrandspecialization: 'Honda',
            employees: new employees(),
        };
        delete mechanic.mechanicId;

        moockRepoFunctions.save.mockResolvedValue(mechanic);

        const newMechanic = await mechanicsService.create(mechanic);
        expect(newMechanic).toEqual(mechanic);
    });

    it('should return all mechanics', async () => {
        const mechanicsList: mechanics[] = [new mechanics(), new mechanics(), new mechanics()];
        moockRepoFunctions.find.mockResolvedValue(mechanicsList);
        const newMechanicsList = await mechanicsService.findAll();
        expect(newMechanicsList).toHaveLength(3);
    });

    it('should retunrn an mechanic by id', async () => {
        const mechanic = new mechanics();
        mechanic.mechanicId = 1;
        moockRepoFunctions.findOne.mockResolvedValue(mechanic);
        const mechanicRes = await mechanicsService.findById(1);
        expect(mechanicRes).toEqual(mechanic);
        expect(moockRepoFunctions.findOne).toHaveBeenCalledTimes(1);
    });


    it('should update an mechanic', async () => {
        const mechanic: mechanics = {
            mechanicId: 1,
            vehiclebrandspecialization: 'Honda',
            employees: new employees(),
        };
        moockRepoFunctions.findOne.mockResolvedValue(mechanic);
        moockRepoFunctions.save.mockResolvedValue(mechanic);

        const updatedMechanic = await mechanicsService.update(mechanic.mechanicId, {
            vehiclebrandspecialization: 'Toyota',
        });
        expect(updatedMechanic).toEqual(mechanic);
        expect(updatedMechanic.vehiclebrandspecialization).toBe('Toyota');
        expect(moockRepoFunctions.save).toHaveBeenCalledWith(mechanic);
    });

    it('should delete an mechanic', async () => {
        const mechanicId = 1;
        await mechanicsService.delete(mechanicId);
        expect(moockRepoFunctions.delete).toHaveBeenCalledWith(mechanicId);
    });
});
