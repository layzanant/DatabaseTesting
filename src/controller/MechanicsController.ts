import { Request, Response } from 'express';
import { MechanicsService } from '../services/MechanicsService';

export class MechanicsController {
    private mechanicsService: MechanicsService;

    constructor() {
        this.mechanicsService = new MechanicsService();
    }

    async getMechanics(req: Request, res: Response) {
        const mechanics = await this.mechanicsService.findAll();
        res.status(200).json(mechanics);
    }

    async getMechanicById(req: Request, res: Response) {
        const id = parseInt(req.params.mechanicId);
        const mechanic = await this.mechanicsService.findById(id);
        if (mechanic) {
            res.status(200).json(mechanic);
        } else {
            res.status(404).send('Mechanic not found');
        }
    }

    async createMechanic(req: Request, res: Response) {
        const mechanic = await this.mechanicsService.create(req.body);
        res.status(202).json(mechanic);
    }

    async updateMechanic(req: Request, res: Response) {
        const id = parseInt(req.params.mechanicId);
        const updatedMechanic = await this.mechanicsService.update(id, req.body);
        if (updatedMechanic) {
            res.status(200).json(updatedMechanic);
        } else {
            res.status(404).send('Mechanic not found');
        }
    }

    async deleteMechanic(req: Request, res: Response) {
        const id = parseInt(req.params.mechanicId);
        await this.mechanicsService.delete(id);
        res.status(202).send();
    }
}