import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ReporteCiudadanoDTO {
    @IsString()
    @IsOptional()
    nombre?: string;

    @IsString()
    @IsOptional()
    telefono?: string;

    @IsString()
    @IsOptional()
    correo?: string;

    @IsString()
    cp: string;

    @IsString()
    colonia: string;

    @IsNumber()
    categoria: number;

    @IsNumber()
    area: number;

    @IsNumber()
    reporte: string;
}
