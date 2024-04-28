import request from 'supertest';
import app from '../../app';
import { AppDataSource } from '../../data-source';

describe('Integration testing shipments', () => {

    // Defining global variables to be used later
    let shipmentId: number;

    beforeAll(async () => {
        await AppDataSource.initialize();
    });

    afterAll(async () => {
        await AppDataSource.destroy();
    });

    it('POST /shipment should create a shipment', async () => {
        const shipment = {
            customerName: 'AnantShipment',
            address: '256 Lester',
            phone1: 1345678956,
            phone2: 1234567892,
            weight: 200,
            value: 1500,
            origin: "waterloo",
            destination: "Tornoto"

        };
        const response = await request(app)
            .post('/shipment')
            .send(shipment)
            .expect(202);

        shipmentId = response.body.shipmentId;
    });

    it('GET /shipments should return all shipments', async () => {

        const response = await request(app)
            .get('/shipments')
            .expect(200);

        expect(response.body.length).toBeGreaterThan(0);
    });

    it('GET /shipment/:shipmentId should return shipment by id', async () => {
        const response = await request(app)
            .get(`/shipment/${shipmentId}`)
            .expect(200);

        expect(response.body.shipmentId).toBe(shipmentId);
    });

    it('PUT /shipment/:shipment should update shipment by id', async () => {
        const response = await request(app)
            .put(`/shipment/${shipmentId}`)
            .send({
                customerName: 'AnantShipmentNew',
                address: '256 Lester St',
                phone1: 1345678958,
                phone2: 1234567898,
                weight: 300,
                value: 2500,
                origin: "Hamilton",
                destination: "Waterloo"
            })
            .expect(200);

        expect(response.body.customerName).toBe('AnantShipmentNew');
        expect(response.body.address).toBe('256 Lester St');
        expect(response.body.phone1).toBe(1345678958);
        expect(response.body.phone2).toBe(1234567898);
        expect(response.body.weight).toBe(300);
        expect(response.body.value).toBe(2500);
        expect(response.body.origin).toBe('Hamilton');
        expect(response.body.destination).toBe('Waterloo');
        expect(response.body.shipmentId).toBe(shipmentId);
    });

    it('DELETE /shipment/:shipmentId should delete shipment by id', async () => {
        await request(app)
            .delete(`/shipment/${shipmentId}`)
            .expect(202);
    });

    it('GET /shipment/:shipmentId should return 404 not found', async () => {
        const response = await request(app)
            .get(`/shipment/${shipmentId}`)
            .expect(404);
    });
});
