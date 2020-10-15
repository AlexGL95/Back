import { IsString } from "class-validator";


export class authcredentialsdto{
    
    @IsString()
    correo: string;

    @IsString()
    pass: string;

}