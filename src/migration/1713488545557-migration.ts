import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1713488545557 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        // inserting into employees table
        await queryRunner.query(`
                INSERT INTO "employees" ("name", "surname", "seniority", "role") VALUES
                ('John', 'Doe', 5, 'driver'),
                ('Alice', 'Doe', 5, 'driver'),
                ('Joe', 'Doe', 3, 'mechanic')
        `);

        // inserting into drivers table
        await queryRunner.query(`
                INSERT INTO "drivers" ("category") VALUES
                ('G'),
                ('G1'),
                ('G2')
        `);

        // inserting into mechanics table
        await queryRunner.query(`
                INSERT INTO "mechanics" ("vehiclebrandspecialization") VALUES
                ('tata'),
                ('toyota'),
                ('mercedes')
        `);

        // inserting into shipments table
        await queryRunner.query(`
                INSERT INTO "shipments" ("customerName", "address", "phone1", "phone2", "weight", "value", "origin", "destination") VALUES
                ('anant', '2134 lester', '3456789876', '678654677', 29, 43, 'waterloo', 'toronto'),
                ('vipin', '2134 lester', '3456789876', '678654677', 29, 43, 'waterloo', 'toronto'),
                ('aditi', '2134 lester', '3456789876', '678654677', 29, 43, 'waterloo', 'toronto')
        `);

        // inserting into trucks table
        await queryRunner.query(`
                INSERT INTO "trucks" ("brand", "load", "capacity", "year", "numberOfRepairs") VALUES
                ('tata', 100, 120, 2019, 2),
                ('honda', 100, 120, 2019, 1),
                ('mercedes', 100, 120, 2019, 0)
        `);

        // inserting into repairs table
        await queryRunner.query(`
                INSERT INTO "repairs" ("estimatedTimeDays") VALUES
                (3),
                (2),
                (4)
        `);

        // inserting into truckTrips table
        await queryRunner.query(`
                INSERT INTO "truck_trips" ("routeFrom", "routeTo") VALUES
                ('waterloo', 'toronto'),
                ('waterloo', 'calgary'),
                ('calgary', 'waterloo')
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`Truncate table employees cascade`);
        await queryRunner.query(`Truncate table drivers cascade`);
        await queryRunner.query(`Truncate table mechanics cascade`);
        await queryRunner.query(`Truncate table shipments cascade`);
        await queryRunner.query(`Truncate table trucks cascade`);
        await queryRunner.query(`Truncate table repairs cascade`);
        await queryRunner.query(`Truncate table truck_trips cascade`);
    }

}
