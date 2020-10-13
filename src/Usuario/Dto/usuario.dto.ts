import { IsString } from "class-validator";


export class createusuario{
    
    @IsString()
    nombre:string;
    
    @IsString()
    correo: string;

    @IsString()
    pass: string;

}