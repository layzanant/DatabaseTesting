import request from 'supertest';
import app from '../../app';
import { AppDataSource } from '../../data-source';

describe('Integration testing trucks', () => {

    // Defining global variables to be used later
    let truckId: number;


    beforeAll(async () => {
        await AppDataSource.initialize();
    });

    afterAll(async () => {
        await AppDataSource.destroy();
    });

    it('POST /trucks should create a truck', async () => {

        const truck = {
            brand: "Tata",
            load: 2000,
            capacity: 5000,
            year: 2020,
            numberOfRepairs: 3


        };

        const response = await request(app)
            .post('/truck')
            .send(truck)
            .expect(202);

        truckId = response.body.truckId;
    });

    it('GET /trucks should return all trucks', async () => {

        const response = await request(app)
            .get('/trucks')
            .expect(200);

        expect(response.body.length).toBeGreaterThan(0);
    });

    it('GET /truck/:truckId should return truck by id', async () => {
        const response = await request(app)
            .get(`/truck/${truckId}`)
            .expect(200);

        expect(response.body.truckId).toBe(truckId);
    });

    it('PUT /truck/:truck should update truck by id', async () => {
        const response = await request(app)
            .put(`/truck/${truckId}`)
            .send({
                brand: "Ford",
                load: 3000,
                capacity: 4000,
                year: 2021,
                numberOfRepairs: 4,
            })
            .expect(200);

        expect(response.body.brand).toBe('Ford');
        expect(response.body.load).toBe(3000);
        expect(response.body.capacity).toBe(4000);
        expect(response.body.year).toBe(2021);
        expect(response.body.numberOfRepairs).toBe(4);
        expect(response.body.truckId).toBe(truckId);
    });

    it('DELETE /truck/:truckId should delete truck by id', async () => {
        await request(app)
            .delete(`/truck/${truckId}`)
            .expect(202);
    });

    it('GET /truck/:truckId should return 404 not found', async () => {
        const response = await request(app)
            .get(`/truck/${truckId}`)
            .expect(404);
    });
});
