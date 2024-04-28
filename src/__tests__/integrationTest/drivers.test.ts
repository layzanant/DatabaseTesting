import request from 'supertest';
import app from '../../app';
import { AppDataSource } from '../../data-source';
import { UserRole } from '../../entity/employees';
import { employees } from '../../entity/employees';

describe('Integration testing drivers', () => {

    // Defining global variables to be used later
    let driverId: number;
    let employeeId: number;

    beforeAll(async () => {
        await AppDataSource.initialize();

        const employee = {
            name: 'New',
            surname: 'employee',
            seniority: 2,
            role: UserRole.DRIVER,
        };

        const newEmployee = AppDataSource.getRepository(employees).create(employee);
        employeeId = newEmployee.employeeId;
    });

    afterAll(async () => {
        await AppDataSource.destroy();
    });

    it('POST /driver should create a driver', async () => {

        const driver = {
            category: "G",
            employees: employeeId
        };

        const response = await request(app)
            .post('/driver')
            .send(driver)
            .expect(202);

        driverId = response.body.driverId;
    });

    it('GET /drivers should return all drivers', async () => {

        const response = await request(app)
            .get('/drivers')
            .expect(200);

        expect(response.body.length).toBeGreaterThan(0);
    });

    it('GET /driver/:driverId should return driver by id', async () => {
        const response = await request(app)
            .get(`/driver/${driverId}`)
            .expect(200);

        expect(response.body.driverId).toBe(driverId);
    });

    it('PUT /driver/:driver should update driver by id', async () => {
        const response = await request(app)
            .put(`/driver/${driverId}`)
            .send({
                category: "G2",
            })
            .expect(200);

        expect(response.body.category).toBe('G2');
        expect(response.body.driverId).toBe(driverId);
    });

    it('DELETE /driver/:driverId should delete driver by id', async () => {
        await request(app)
            .delete(`/driver/${driverId}`)
            .expect(202);
    });

    it('GET /driver/:driverId should return 404 not found', async () => {
        const response = await request(app)
            .get(`/driver/${driverId}`)
            .expect(404);
    });
});
