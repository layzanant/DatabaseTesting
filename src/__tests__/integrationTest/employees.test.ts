import request from 'supertest';
import app from '../../app';
import { AppDataSource } from '../../data-source';
import { UserRole } from '../../entity/employees';

describe('Integration testing employees', () => {

    // Defining global variables to be used later
    let employeeId: number;

    beforeAll(async () => {
        await AppDataSource.initialize();
    });

    afterAll(async () => {
        await AppDataSource.destroy();
    });

    it('POST /employee should create a employee', async () => {
        const employee = {
            name: 'AnantNewData',
            surname: 'Jain',
            seniority: 1,
            role: UserRole.DRIVER,
        };
        const response = await request(app)
            .post('/employee')
            .send(employee)
            .expect(202);

        employeeId = response.body.employeeId;
    });

    it('GET /employees should return all employees', async () => {

        const response = await request(app)
            .get('/employees')
            .expect(200);

        expect(response.body.length).toBeGreaterThan(0);
    });

    it('GET /employee/:employeeId should return employee by id', async () => {
        const response = await request(app)
            .get(`/employee/${employeeId}`)
            .expect(200);

        expect(response.body.employeeId).toBe(employeeId);
    });

    it('PUT /employee/:employee should update employee by id', async () => {
        const response = await request(app)
            .put(`/employee/${employeeId}`)
            .send({
                name: 'AnantUpdated',
                surname: 'Jain',
                seniority: 1,
                role: UserRole.MECHANIC,
            })
            .expect(200);

        expect(response.body.name).toBe('AnantUpdated');
        expect(response.body.role).toBe(UserRole.MECHANIC);
    });

    it('DELETE /employee/:employeeId should delete employee by id', async () => {
        await request(app)
            .delete(`/employee/${employeeId}`)
            .expect(202);
    });

    it('GET /employee/:employeeId should return 404 not found', async () => {
        const response = await request(app)
            .get(`/employee/${employeeId}`)
            .expect(404);
    });
});
