import { Request, Response } from 'express';
import { EmployeesService } from '../services/EmployeesService';

export class EmployeesController {
    private employeesService: EmployeesService;

    constructor() {
        this.employeesService = new EmployeesService();
    }

    async getEmployees(req: Request, res: Response) {
        const employees = await this.employeesService.findAll();
        res.status(200).json(employees);
    }

    async getEmployeeById(req: Request, res: Response) {
        const id = parseInt(req.params.employeeId);
        const employee = await this.employeesService.findById(id);
        if (employee) {
            res.status(200).json(employee);
        } else {
            res.status(404).send('Employee not found');
        }
    }

    async createEmployee(req: Request, res: Response) {
        const employee = await this.employeesService.create(req.body);
        res.status(202).json(employee);
    }

    async updateEmployee(req: Request, res: Response) {
        const id = parseInt(req.params.employeeId);
        const updatedEmployee = await this.employeesService.update(id, req.body);
        if (updatedEmployee) {
            res.status(200).json(updatedEmployee);
        } else {
            res.status(404).send('Employee not found');
        }
    }

    async deleteEmployee(req: Request, res: Response) {
        const id = parseInt(req.params.employeeId);
        await this.employeesService.delete(id);
        res.status(202).send();
    }
}