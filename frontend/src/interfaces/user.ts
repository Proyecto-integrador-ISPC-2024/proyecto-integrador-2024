/* export interface User {
  id?: number;
  name: string;
  lastName: string;
  userName: string;
  email: string;
  address: string;
  password: string;
  role: string
}
 */
export class User {
  name: string = "";
  lastName: string = "";
  address: string = "";
  email: string = "";
  password: string = "";
  userName: string = "";
  role: string = "cliente";
  id: number = 0;
}