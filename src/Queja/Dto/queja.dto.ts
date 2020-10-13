import { IsNumber, IsOptional, IsString } from 'class-validator';

export class createquejadto{
    
    @IsString()
    @IsOptional()
    nombre?:string;
    
    @IsString()
    @IsOptional()
    telefono?:string;
    
    @IsString()
    @IsOptional()
    correo?:string;
    
    @IsString()
    cp:string;

    @IsString()
    colonia:string;

    @IsNumber()
    categoria:number;

    @IsNumber()
    area:number;

    @IsString()
    queja:string;
}