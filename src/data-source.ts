import "reflect-metadata"
import { DataSource } from "typeorm"
import { trucks } from "./entity/trucks"
import { employees } from "./entity/employees"
import { drivers } from "./entity/drivers"
import { shipments } from "./entity/shipments"
import { mechanics } from "./entity/mechanics"
import { truckTrips } from "./entity/truckTrips"
import { repairs } from "./entity/repairs"


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: [employees, trucks, drivers, shipments, mechanics, truckTrips, repairs],
    migrations: ['src/migration/**/*.ts'],
    subscribers: [],
})


