import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Categoria } from 'src/Categoria/categoria.entity';
import { AreaRC } from 'src/Categoria/Areas/areaRC.entity';

@Entity()
export class reporteCiudadano extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    telefono: string;

    @Column()
    correo: string;

    @Column()
    codigoPostal: string;

    @Column()
    colonia: string;

    @ManyToOne(type => Categoria, categoria => categoria.id)
    categoria: Categoria;

    @ManyToOne(type => AreaRC, areaRC => areaRC.id)
    area: AreaRC;

    @Column()
    reporte: string;

    @Column()
    anexos: string;

    @Column()
    fecha: string;

    @Column()
    folio: string;

    @Column()
    activa: boolean;

    @Column()
    afiliacion: boolean;

}
