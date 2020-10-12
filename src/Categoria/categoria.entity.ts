import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Queja } from 'src/Queja/queja.entity';
import { Propuesta } from 'src/Propuesta/propuesta.entity';
import { reporteCiudadano } from 'src/Reporte_ciudadano/reporte-ciudadano.entity';


@Entity()
export class Categoria extends BaseEntity{

    @PrimaryGeneratedColumn()
    @OneToMany(type => Queja, queja => queja.categoria)
    @OneToMany(type => Propuesta, propuesta => propuesta.categoria)
    id: number;

    @Column()
    tipo: string;

}