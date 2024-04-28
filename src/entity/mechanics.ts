import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Double } from "typeorm"
import { employees } from './employees'
import { repairs } from "./repairs";

@Entity()
export class mechanics {

    @PrimaryGeneratedColumn()
    mechanicId: number;

    @Column()
    vehiclebrandspecialization: string;

    @OneToOne(type => employees, employees => employees.drivers)
    @JoinColumn()
    employees?: employees;

    @OneToOne(type => repairs, repairs => repairs.mechanics)
    repairs?: repairs;

}


