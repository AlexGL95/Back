import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Categoria } from 'src/Categoria/categoria.entity';
import { AreaPropuestas } from 'src/Categoria/Areas/areaPropuestas.entity';

@Entity()
export class Propuesta extends BaseEntity{

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

    @ManyToOne(type => AreaPropuestas, areaPropuestas => areaPropuestas.id)
    area: AreaPropuestas;

    @Column()
    problema: string;

    @Column()
    propuesta: string;

    @Column()
    anexos: string;

    @Column()
    fecha: string;

    @Column()
    activa: boolean;

}
