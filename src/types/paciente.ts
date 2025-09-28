export interface PacienteForm {
    name:             string;
    email:            string;
    password:         string;
    direccion?:        string;
    fecha_nacimiento: string;
    nota_adicional?:   string;
}

/********************* PACIENTE  *******************/
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
    celular:     string;
    reset_token: null;
    ci_ruc: string;
    createdAt:   Date;
    updatedAt:   Date;
}
