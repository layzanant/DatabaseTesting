import { Request, Response } from 'express';
import { TruckTripsService } from '../services/TruckTripsService';

export class TruckTripsController {
    private truckTripsService: TruckTripsService;

    constructor() {
        this.truckTripsService = new TruckTripsService();
    }

    async getTruckTrips(req: Request, res: Response) {
        const truckTrips = await this.truckTripsService.findAll();
        res.status(200).json(truckTrips);
    }

    async getTruckTripById(req: Request, res: Response) {
        const id = parseInt(req.params.tripId);
        const truckTrip = await this.truckTripsService.findById(id);
        if (truckTrip) {
            res.status(200).json(truckTrip);
        } else {
            res.status(404).send('TruckTrip not found');
        }
    }

    async createTruckTrip(req: Request, res: Response) {
        const truckTrip = await this.truckTripsService.create(req.body);
        res.status(202).json(truckTrip);
    }

    async updateTruckTrip(req: Request, res: Response) {
        const id = parseInt(req.params.tripId);
        const updatedTruckTrip = await this.truckTripsService.update(id, req.body);
        if (updatedTruckTrip) {
            res.status(200).json(updatedTruckTrip);
        } else {
            res.status(404).send('TruckTrip not found');
        }
    }

    async deleteTruckTrip(req: Request, res: Response) {
        const id = parseInt(req.params.tripId);
        await this.truckTripsService.delete(id);
        res.status(202).send();
    }
}