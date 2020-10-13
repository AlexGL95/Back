import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Categoria } from 'src/Categoria/categoria.entity';
import { AreaQuejas } from 'src/Categoria/Areas/areaQuejas.entity';

@Entity()
export class Queja extends BaseEntity{

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

    @ManyToOne(type => AreaQuejas, areaQuejas => areaQuejas.id)
    area: AreaQuejas;

    @Column()
    queja: string;

    @Column()
    evidencia: string;

    @Column()
    fecha: string;
    
    @Column()
    folio: string;

    @Column()
    activa: boolean;

    @Column()
    afiliacion: boolean;

}
