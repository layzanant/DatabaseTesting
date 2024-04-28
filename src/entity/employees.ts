import { Entity, PrimaryGeneratedColumn, Column, OneToOne, FindOptionsRelationsProperty, Decimal128, Int32 } from "typeorm"
import { ColumnEnumOptions } from "typeorm/decorator/options/ColumnEnumOptions"
import { drivers } from "./drivers";
import { mechanics } from "./mechanics";

export enum UserRole {
    DRIVER = "driver",
    MECHANIC = "mechanic",
}

@Entity()
export class employees {

    @PrimaryGeneratedColumn()
    employeeId: number;

    @Column({
        length: 100
    })
    name: string;

    @Column({
        length: 100
    })
    surname: string;

    @Column()
    seniority: number;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.DRIVER
    })
    role: UserRole;

    @OneToOne(type => drivers, drivers => drivers.employees)
    drivers?: drivers;

    @OneToOne(type => mechanics, mechanics => mechanics.employees)
    mechanics?: mechanics;

}
