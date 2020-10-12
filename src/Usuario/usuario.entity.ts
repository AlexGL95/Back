import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class usuario extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nombre: string;

    @Column()
    correo: string;

    @Column()
    pass: string;

    @Column()
    salt: string;

    @Column()
    token: string;

    @Column()
    super: boolean;

    @Column()
    activo: boolean;

}