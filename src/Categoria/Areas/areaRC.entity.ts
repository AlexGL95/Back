import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { reporteCiudadano } from 'src/Reporte_ciudadano/reporte-ciudadano.entity';


@Entity()
export class AreaRC extends BaseEntity{

    @PrimaryGeneratedColumn()
    @OneToMany(type => reporteCiudadano, reporteCiudadano => reporteCiudadano.area)
    id: number;

    @Column()
    area: string;

}