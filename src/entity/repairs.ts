import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Double } from "typeorm"
import { mechanics } from './mechanics'
import { trucks } from './trucks'

@Entity()
export class repairs {

    @PrimaryGeneratedColumn()
    repairId: number;

    @Column()
    estimatedTimeDays: number;

    @OneToOne(type => trucks, trucks => trucks.repairs)
    @JoinColumn()
    trucks?: trucks;

    @OneToOne(type => mechanics, mechanics => mechanics.repairs)
    @JoinColumn()
    mechanics?: mechanics;

}


