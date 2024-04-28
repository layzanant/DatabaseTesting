import request from 'supertest';
import app from '../../app';
import { AppDataSource } from '../../data-source';
import { UserRole } from '../../entity/employees';
import { employees } from '../../entity/employees';

describe('Integration testing mechanics', () => {

    // Defining global variables to be used later
    let mechanicId: number;
    let repairId: number;
    let employeeId: number;

    beforeAll(async () => {
        await AppDataSource.initialize();

        const employee = {
            name: 'NewMechanic',
            surname: 'employee',
            seniority: 1,
            role: UserRole.MECHANIC,
        };

        const newEmployee = AppDataSource.getRepository(employees).create(employee);
        employeeId = newEmployee.employeeId;



    });

    afterAll(async () => {
        await AppDataSource.destroy();
    });

    it('POST /mechanics should create a mechanic', async () => {

        const mechanic = {
            vehiclebrandspecialization: "Tata",
            employees: employeeId

        };

        const response = await request(app)
            .post('/mechanic')
            .send(mechanic)
            .expect(202);

        mechanicId = response.body.mechanicId;
    });

    it('GET /mechanics should return all mechanics', async () => {

        const response = await request(app)
            .get('/mechanics')
            .expect(200);

        expect(response.body.length).toBeGreaterThan(0);
    });

    it('GET /mechanic/:mechanicId should return mechanic by id', async () => {
        const response = await request(app)
            .get(`/mechanic/${mechanicId}`)
            .expect(200);

        expect(response.body.mechanicId).toBe(mechanicId);
    });

    it('PUT /mechanic/:mechanic should update mechanic by id', async () => {
        const response = await request(app)
            .put(`/mechanic/${mechanicId}`)
            .send({
                vehiclebrandspecialization: "Ford",
            })
            .expect(200);

        expect(response.body.vehiclebrandspecialization).toBe('Ford');
        expect(response.body.mechanicId).toBe(mechanicId);
    });

    it('DELETE /mechanic/:mechanicId should delete mechanic by id', async () => {
        await request(app)
            .delete(`/mechanic/${mechanicId}`)
            .expect(202);
    });

    it('GET /mechanic/:mechanicId should return 404 not found', async () => {
        const response = await request(app)
            .get(`/mechanic/${mechanicId}`)
            .expect(404);
    });
});
