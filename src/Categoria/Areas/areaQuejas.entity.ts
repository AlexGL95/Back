import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Queja } from 'src/Queja/queja.entity';


@Entity()
export class AreaQuejas extends BaseEntity{

    @PrimaryGeneratedColumn()
    @OneToMany(type => Queja, queja => queja.area)
    id: number;

    @Column()
    area: string;

}