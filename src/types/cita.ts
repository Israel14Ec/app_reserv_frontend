export enum EstadoCita {
    PENDIENTE = 'pendiente',
    CONFIRMADA = 'confirmada',
    CANCELADA = 'cancelada',
    COMPLETADA = 'finalizada',
    CANCELADA_CLIENTE="cancelada_cliente"
}

export interface CitaForm {
    fecha_cita:     string;
    id_paciente:    number;
    id_profesional: number;
    id_horario:     number;
    id_servicio:    number;
}

/****************** CITAS  ***************/
export interface Cita {
    id:          number;
    numero_cita: string;
    estado:      EstadoCita;
    fecha_cita:  string;
    nota:        string;
    createdAt:   Date;
    updatedAt:   Date;
    profesional: Profesional;
    paciente:    Paciente;
    servicio:    Servicio;
    horario:     Horario;
}

export interface Horario {
    id:           number;
    dia_atencion: string;
    hora_inicio:  string;
    hora_fin:     string;
    createdAt:    Date;
    updatedAt:    Date;
}

export interface Paciente {
    id:               number;
    direccion:        string;
    fecha_nacimiento: Date;
    nota_adicional:   string;
    createdAt:        Date;
    updatedAt:        Date;
    usuario:          Usuario;
}

export interface Usuario {
    id:          number;
    nombre:      string;
    email:       string;
    password:    string;
    celular:     null | string;
    ci_ruc:      string;
    reset_token: null;
    createdAt:   Date;
    updatedAt:   Date;
}

export interface Profesional {
    id:          number;
    descripcion: string;
    usuario:     Usuario;
}

export interface Servicio {
    id:          number;
    nombre:      string;
    descripcion: string;
    createdAt:   Date;
    updatedAt:   Date;
}

