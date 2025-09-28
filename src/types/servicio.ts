export interface ServicioForm {
    nombre:         string;
    descripcion:    string;
    id_profesional: string;
}


export interface Servicio {
    id:          number;
    nombre:      string;
    descripcion: string;
    createdAt:   Date;
    updatedAt:   Date;
}
