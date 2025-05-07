export class User {
  nombre: string = "";
  apellido: string = "";
  domicilio: string = "";
  email: string = "";
  password: string = "";
  role: string = "cliente";
  id_usuario: number = 0;
}

export interface UserLocalStoraged {
  apellido: string;
  domicilio: string;
  email: string;
  id_usuario: number;
  nombre: string;
  rol: string
}
