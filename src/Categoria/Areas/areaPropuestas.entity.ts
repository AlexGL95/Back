import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Propuesta } from 'src/Propuesta/propuesta.entity';


@Entity()
export class AreaPropuestas extends BaseEntity{

    @PrimaryGeneratedColumn()
    @OneToMany(type => Propuesta, propuesta => propuesta.area)
    id: number;

    @Column()
    area: string;

}