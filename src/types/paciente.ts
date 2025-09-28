export interface PacienteForm {
    name:             string;
    email:            string;
    password:         string;
    direccion?:        string;
    fecha_nacimiento: string;
    nota_adicional?:   string;
}
