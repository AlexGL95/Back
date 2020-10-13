import { Categoria } from "src/Categoria/categoria.entity";
import { AreaRC } from "src/Categoria/Areas/areaRC.entity";

export interface ReporteCiudadanoInterface {
    nombre: string;
    telefono: string;
    correo: string;
    codigoPostal: string;
    colonia: string;
    categoria: Categoria;
    area: AreaRC;
    reporte: string;
    anexos: string;
    fecha: string;
    folio: string;
    activa: boolean;
    afiliacion: boolean;
}
