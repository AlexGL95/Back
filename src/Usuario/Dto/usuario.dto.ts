import { IsString } from "class-validator";


export class createusuariodto{
    
    @IsString()
    nombre:string;
    
    @IsString()
    correo: string;

    @IsString()
    pass: string;

}