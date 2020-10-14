import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class Usuario extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

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

    async validatepass(pass:string):Promise<boolean>{
        const hash =await bcrypt.hash(pass,this.salt);
        return await hash === this.pass;
    }
}