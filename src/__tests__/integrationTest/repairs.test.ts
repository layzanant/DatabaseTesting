import request from 'supertest';
import app from '../../app';
import { AppDataSource } from '../../data-source';
import { UserRole } from '../../entity/employees';
import { trucks } from '../../entity/trucks';
import { employees } from '../../entity/employees'
import { mechanics } from '../../entity/mechanics';

describe('Integration testing of Repairs', () => {

    // Defining global variables to be used later
    let repairId: number;
    let employeeId: number;
    let mechanicId: number;
    let truckId: number;

    beforeAll(async () => {
        await AppDataSource.initialize();

        const employee = {
            name: 'Newrepair',
            surname: 'employee',
            seniority: 2,
            role: UserRole.MECHANIC,
        };

        const newEmployee = AppDataSource.getRepository(employees).create(employee);
        employeeId = newEmployee.employeeId;

        const mechanic = {
            vehiclebrandspecialization: 'Tata',
        };

        const newMechanic = AppDataSource.getRepository(mechanics).create(mechanic)
        mechanicId = newMechanic.mechanicId;


        const truck = {
            brand: "Tata",
            load: 2000,
            capacity: 5000,
            year: 2020,
            numberOfRepairs: 3,
        };

        const newTruck = AppDataSource.getRepository(trucks).create(truck)
        truckId = newTruck.truckId;

    })

    afterAll(async () => {
        await AppDataSource.destroy();
    });

    it('POST /repair should create a repair', async () => {

        const repair = {
            estimatedTimeDays: 3,
            trucks: truckId,
            mechanics: mechanicId
        };

        const response = await request(app)
            .post('/repair')
            .send(repair)
            .expect(202);

        repairId = response.body.repairId;
    });

    it('GET /repairs should return all repairs', async () => {

        const response = await request(app)
            .get('/repairs')
            .expect(200);

        expect(response.body.length).toBeGreaterThan(0);
    });

    it('GET /repair/:repairId should return repair by id', async () => {
        const response = await request(app)
            .get(`/repair/${repairId}`)
            .expect(200);

        expect(response.body.repairId).toBe(repairId);
    });

    it('PUT /repair/:repair should update repair by id', async () => {
        const response = await request(app)
            .put(`/repair/${repairId}`)
            .send({
                estimatedTimeDays: 5
            })
            .expect(200);

        expect(response.body.estimatedTimeDays).toBe(5);
        expect(response.body.repairId).toBe(repairId);
    });

    it('DELETE /repair/:repairId should delete repair by id', async () => {
        await request(app)
            .delete(`/repair/${repairId}`)
            .expect(202);
    });

    it('GET /repair/:repairId should return 404 not found', async () => {
        const response = await request(app)
            .get(`/repair/${repairId}`)
            .expect(404);
    });

});
