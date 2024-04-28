import { Request, Response } from 'express';
import { RepairsService } from '../services/RepairsService';

export class RepairsController {
    private repairsService: RepairsService;

    constructor() {
        this.repairsService = new RepairsService();
    }

    async getRepairs(req: Request, res: Response) {
        const repairs = await this.repairsService.findAll();
        res.status(200).json(repairs);
    }

    async getRepairById(req: Request, res: Response) {
        const id = parseInt(req.params.repairId);
        const repair = await this.repairsService.findById(id);
        if (repair) {
            res.status(200).json(repair);
        } else {
            res.status(404).send('Repair not found');
        }
    }

    async createRepair(req: Request, res: Response) {
        const repair = await this.repairsService.create(req.body);
        res.status(202).json(repair);
    }

    async updateRepair(req: Request, res: Response) {
        const id = parseInt(req.params.repairId);
        const updatedRepair = await this.repairsService.update(id, req.body);
        if (updatedRepair) {
            res.status(200).json(updatedRepair);
        } else {
            res.status(404).send('Repair not found');
        }
    }

    async deleteRepair(req: Request, res: Response) {
        const id = parseInt(req.params.repairId);
        await this.repairsService.delete(id);
        res.status(202).send();
    }
}