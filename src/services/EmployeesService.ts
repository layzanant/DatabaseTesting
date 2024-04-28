import { AppDataSource } from '../data-source';
import { employees } from '../entity/employees';

export class EmployeesService {

    private employeesRepository = AppDataSource.getRepository(employees);

    async findAll() {

        return await this.employeesRepository.find({
            relations:
            {
                drivers: true,
                mechanics: true
            }
        });
    }

    async findById(employeeId: number) {

        return await this.employeesRepository.findOne({
            where: {
                employeeId
            }, relations: {
                drivers: true,
                mechanics: true
            }
        });
    }

    async create(employeesData: employees) {
        const employee = this.employeesRepository.create(employeesData);

        return await this.employeesRepository.save(employee);
    }

    async update(employeeId: number, employeesData: Partial<employees>) {
        let employee = await this.findById(employeeId);
        if (!employee) return;
        Object.assign(employee, employeesData);

        return await this.employeesRepository.save(employee);
    }

    async delete(employeeId: number) {

        return await this.employeesRepository.delete(employeeId);
    }
}
