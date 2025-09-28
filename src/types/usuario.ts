/** INTERFACE PARA USUARIO DE LA APLICACIÓN (CLIENTE O PROFESIONAL) */

export interface UsuarioApp {
    paciente:     Paciente | null;
    profesional:  Profesional | null;
    tipo_usuario: string;
    usuario:      Usuario;
}

export interface Paciente {
    id:               number;
    direccion:        string;
    fecha_nacimiento: Date;
    nota_adicional:   string;
    createdAt:        Date;
    updatedAt:        Date;
}

export interface Usuario {
    id:          number;
    nombre:      string;
    email:       string;
    password:    string;
    celular:     string;
    reset_token: null;
    createdAt:   Date;
    updatedAt:   Date;
    ci_ruc: string;
}

export interface Profesional {
    id:          number;
    descripcion: string;
}
