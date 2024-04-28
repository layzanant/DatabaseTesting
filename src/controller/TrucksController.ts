import { Request, Response } from 'express';
import { TrucksService } from '../services/TrucksService';

export class TrucksController {
    private trucksService: TrucksService;

    constructor() {
        this.trucksService = new TrucksService();
    }

    async getTrucks(req: Request, res: Response) {
        const trucks = await this.trucksService.findAll();
        res.status(200).json(trucks);
    }

    async getTruckById(req: Request, res: Response) {
        const id = parseInt(req.params.truckId);
        const truck = await this.trucksService.findById(id);
        if (truck) {
            res.status(200).json(truck);
        } else {
            res.status(404).send('Truck not found');
        }
    }

    async createTruck(req: Request, res: Response) {
        const truck = await this.trucksService.create(req.body);
        res.status(202).json(truck);
    }

    async updateTruck(req: Request, res: Response) {
        const id = parseInt(req.params.truckId);
        const updatedTruck = await this.trucksService.update(id, req.body);
        if (updatedTruck) {
            res.status(200).json(updatedTruck);
        } else {
            res.status(404).send('Truck not found');
        }
    }

    async deleteTruck(req: Request, res: Response) {
        const id = parseInt(req.params.truckId);
        await this.trucksService.delete(id);
        res.status(202).send();
    }
}