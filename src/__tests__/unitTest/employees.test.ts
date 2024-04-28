import { AppDataSource } from "../../data-source";
import { employees } from "../../entity/employees";
import { UserRole } from "../../entity/employees";
import { moockRepoFunctions } from "../mockRepoFunctions";
import { EmployeesService } from "../../services/EmployeesService";

(AppDataSource.getRepository as jest.Mock) = jest.fn(() => moockRepoFunctions);

describe('Employees unit testing', () => {
    let employeesService: EmployeesService;

    beforeEach(() => {
        jest.clearAllMocks();
        employeesService = new EmployeesService();
    });

    it('should create a employee', async () => {
        const employee: employees = {
            employeeId: 1,
            name: 'AnantNewData',
            surname: 'Jain',
            seniority: 1,
            role: UserRole.DRIVER,
        };
        delete employee.employeeId;

        moockRepoFunctions.save.mockResolvedValue(employee);

        const newEmployee = await employeesService.create(employee);
        expect(newEmployee).toEqual(employee);
    });

    it('should return all employees', async () => {
        const employeesList: employees[] = [new employees(), new employees(), new employees()];
        moockRepoFunctions.find.mockResolvedValue(employeesList);
        const newEmployeesList = await employeesService.findAll();
        expect(newEmployeesList).toHaveLength(3);
    });

    it('should retunrn an employee by id', async () => {
        const employee = new employees();
        employee.employeeId = 1;
        moockRepoFunctions.findOne.mockResolvedValue(employee);
        const employeeRes = await employeesService.findById(1);
        expect(employeeRes).toEqual(employee);
        expect(moockRepoFunctions.findOne).toHaveBeenCalledTimes(1);
    });


    it('should update an employee', async () => {
        const employee: employees = {
            employeeId: 1,
            name: 'AnantNewData',
            surname: 'Jain',
            seniority: 1,
            role: UserRole.DRIVER,
        };
        moockRepoFunctions.findOne.mockResolvedValue(employee);
        moockRepoFunctions.save.mockResolvedValue(employee);

        const updatedEmployee = await employeesService.update(employee.employeeId, {
            name: 'AnantUpdated',
        });
        expect(updatedEmployee).toEqual(employee);
        expect(updatedEmployee.name).toBe('AnantUpdated');
        expect(moockRepoFunctions.save).toHaveBeenCalledWith(employee);
    });

    it('should delete an employee', async () => {
        const employeeId = 1;
        await employeesService.delete(employeeId);
        expect(moockRepoFunctions.delete).toHaveBeenCalledWith(employeeId);
    });
});
