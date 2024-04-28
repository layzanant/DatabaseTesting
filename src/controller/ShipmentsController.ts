import { Request, Response } from 'express';
import { ShipmentsService } from '../services/ShipmentsService';

export class ShipmentsController {
    private shipmentsService: ShipmentsService;

    constructor() {
        this.shipmentsService = new ShipmentsService();
    }

    async getShipments(req: Request, res: Response) {
        const shipments = await this.shipmentsService.findAll();
        res.status(200).json(shipments);
    }

    async getShipmentById(req: Request, res: Response) {
        const id = parseInt(req.params.shipmentId);
        const shipment = await this.shipmentsService.findById(id);
        if (shipment) {
            res.status(200).json(shipment);
        } else {
            res.status(404).send('Shipment not found');
        }
    }

    async createShipment(req: Request, res: Response) {
        const shipment = await this.shipmentsService.create(req.body);
        res.status(202).json(shipment);
    }

    async updateShipment(req: Request, res: Response) {
        const id = parseInt(req.params.shipmentId);
        const updatedShipment = await this.shipmentsService.update(id, req.body);
        if (updatedShipment) {
            res.status(200).json(updatedShipment);
        } else {
            res.status(404).send('Shipment not found');
        }
    }

    async deleteShipment(req: Request, res: Response) {
        const id = parseInt(req.params.shipmentId);
        await this.shipmentsService.delete(id);
        res.status(202).send();
    }
}