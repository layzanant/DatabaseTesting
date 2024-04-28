import { AppDataSource } from "../../data-source";
import { repairs } from "../../entity/repairs";
import { UserRole } from "../../entity/employees";
import { moockRepoFunctions } from "../mockRepoFunctions";
import { RepairsService } from "../../services/RepairsService";
import { employees } from "../../entity/employees";
import { trucks } from "../../entity/trucks";
import { mechanics } from "../../entity/mechanics";

(AppDataSource.getRepository as jest.Mock) = jest.fn(() => moockRepoFunctions);

describe('Repairs unit testing', () => {
    let repairsService: RepairsService;

    beforeEach(() => {
        jest.clearAllMocks();
        repairsService = new RepairsService();
    });

    it('should create a repair', async () => {
        const repair: repairs = {
            repairId: 1,
            estimatedTimeDays: 3,
            trucks: new trucks(),
            mechanics: new mechanics(),
        };
        delete repair.repairId;

        moockRepoFunctions.save.mockResolvedValue(repair);

        const newRepair = await repairsService.create(repair);
        expect(newRepair).toEqual(repair);
    });

    it('should return all repairs', async () => {
        const repairsList: repairs[] = [new repairs(), new repairs(), new repairs()];
        moockRepoFunctions.find.mockResolvedValue(repairsList);
        const newRepairsList = await repairsService.findAll();
        expect(newRepairsList).toHaveLength(3);
    });

    it('should retunrn an repair by id', async () => {
        const repair = new repairs();
        repair.repairId = 1;
        moockRepoFunctions.findOne.mockResolvedValue(repair);
        const repairRes = await repairsService.findById(1);
        expect(repairRes).toEqual(repair);
        expect(moockRepoFunctions.findOne).toHaveBeenCalledTimes(1);
    });


    it('should update an repair', async () => {
        const repair: repairs = {
            repairId: 1,
            estimatedTimeDays: 3,
            trucks: new trucks(),
            mechanics: new mechanics(),
        };
        moockRepoFunctions.findOne.mockResolvedValue(repair);
        moockRepoFunctions.save.mockResolvedValue(repair);

        const updatedRepair = await repairsService.update(repair.repairId, {
            estimatedTimeDays: 5,
        });
        expect(updatedRepair).toEqual(repair);
        expect(updatedRepair.estimatedTimeDays).toBe(5);
        expect(moockRepoFunctions.save).toHaveBeenCalledWith(repair);
    });

    it('should delete an repair', async () => {
        const repairId = 1;
        await repairsService.delete(repairId);
        expect(moockRepoFunctions.delete).toHaveBeenCalledWith(repairId);
    });
});
