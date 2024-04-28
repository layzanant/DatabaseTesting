import request from 'supertest';
import app from '../../app';
import { AppDataSource } from '../../data-source';
import { drivers } from '../../entity/drivers';
import { trucks } from '../../entity/trucks';
import { shipments } from '../../entity/shipments';

describe('Integration testing truckTrips', () => {

    // Defining global variables to be used later

    let tripId: number;
    let driver1Id: number;
    let driver2Id: number;
    let truckId: number;
    let shipmentId: number;

    beforeAll(async () => {
        await AppDataSource.initialize();

        const truck = {
            brand: "Tata",
            load: 2000,
            capacity: 5000,
            year: 2020,
            numberOfRepairs: 3,
        };

        const newTruck = AppDataSource.getRepository(trucks).create(truck);
        truckId = newTruck.truckId;

        const shipment = {
            customerName: 'AnantShipment',
            address: '256 Lester',
            phone1: '1345678956',
            phone2: '1234567892',
            weight: 200,
            value: 1500,
            origin: "waterloo",
            destination: "Tornoto"
        };

        const newShipment = AppDataSource.getRepository(shipments).create(shipment)
        shipmentId = newShipment.shipmentId;

        const driver1 = {
            category: "G"
        };

        const newDriver1 = AppDataSource.getRepository(drivers).create(driver1);
        driver1Id = newDriver1.driverId;

        const driver2 = {
            category: "G2"
        };

        const newDriver2 = AppDataSource.getRepository(drivers).create(driver2);
        driver2Id = newDriver1.driverId;

    });

    afterAll(async () => {
        await AppDataSource.destroy();
    });

    it('POST /truckTrip should create a truckTrip', async () => {

        const truckTrip = {
            routeFrom: "Waterloo",
            routeTo: "Tornoto",
            trucks: truckId,
            shipments: shipmentId,
            driver1: driver1Id,
            driver2: driver2Id
        };

        const response = await request(app)
            .post('/truckTrip')
            .send(truckTrip)
            .expect(202);

        tripId = response.body.tripId;
    });

    it('GET /truckTrips should return all truckTrips', async () => {

        const response = await request(app)
            .get('/truckTrips')
            .expect(200);

        expect(response.body.length).toBeGreaterThan(0);
    });

    it('GET /truckTrip/:tripId should return truckTrip by id', async () => {
        const response = await request(app)
            .get(`/truckTrip/${tripId}`)
            .expect(200);

        expect(response.body.tripId).toBe(tripId);
    });

    it('PUT /truckTrip/:tripId should update truckTrip by id', async () => {
        const response = await request(app)
            .put(`/truckTrip/${tripId}`)
            .send({
                routeFrom: "Guleph",
                routeTo: "Waterloo",
            })
            .expect(200);

        expect(response.body.routeFrom).toBe('Guleph');
        expect(response.body.routeTo).toBe('Waterloo');
        expect(response.body.tripId).toBe(tripId);
    });

    it('DELETE /truckTrip/:tripId should delete truckTrip by id', async () => {
        await request(app)
            .delete(`/truckTrip/${tripId}`)
            .expect(202);
    });

    it('GET /truckTrip/:tripId should return 404 not found', async () => {
        const response = await request(app)
            .get(`/truckTrip/${tripId}`)
            .expect(404);
    });
});
