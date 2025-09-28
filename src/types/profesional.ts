export interface ProfesionalForm {
    name:        string;
    email:       string;
    password:    string;
    descripcion: string;
    celular?:string;
}


/********* all  */
export interface Profesional {
    id:          number;
    descripcion: string;
    usuario:     Usuario;
}

export interface Usuario {
    id:          number;
    nombre:      string;
    email:       string;
    password:    string;
    celular:     string |null;
    ci_ruc:      string;
    reset_token: null;
    createdAt:   Date;
    updatedAt:   Date;
}
