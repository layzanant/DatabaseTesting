import { Entity, PrimaryGeneratedColumn, Column, Double, OneToOne, OneToMany } from "typeorm"
import { repairs } from "./repairs";
import { truckTrips } from "./truckTrips";

@Entity()
export class trucks {

    @PrimaryGeneratedColumn()
    truckId: number;

    @Column()
    brand: string;

    @Column("double precision")
    load: number;

    @Column("double precision")
    capacity: number;

    @Column()
    year: number;

    @Column()
    numberOfRepairs: number;

    @OneToOne(type => repairs, repairs => repairs.trucks)
    repairs?: repairs;

    @OneToMany(type => truckTrips, truckTrips => truckTrips.trucks)
    truckTrips?: truckTrips;

}


