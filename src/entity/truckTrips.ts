import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Double, ManyToOne } from "typeorm"
import { shipments } from './shipments'
import { trucks } from './trucks'
import { drivers } from './drivers'

@Entity()
export class truckTrips {

    @PrimaryGeneratedColumn()
    tripId: number;

    @Column()
    routeFrom: string;

    @Column()
    routeTo: string;

    @ManyToOne(type => trucks, trucks => trucks.truckTrips, { eager: true })
    @JoinColumn()
    trucks?: trucks;

    @ManyToOne(type => shipments, shipments => shipments.truckTrips, { eager: true })
    @JoinColumn()
    shipments?: shipments;

    @ManyToOne(type => drivers, drivers => drivers.truckTrips1, { eager: true })
    @JoinColumn()
    driver1?: drivers;

    @ManyToOne(type => drivers, drivers => drivers.truckTrips2, { eager: true })
    @JoinColumn()
    driver2?: drivers;

}
