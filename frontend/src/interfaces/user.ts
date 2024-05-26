/* export interface User {
  id?: number;
  name: string;
  lastName: string;
  address: string;
  userName: string;
  email: string;
  password: string;
  createdAt: string;
  isAdmin: boolean;
}
 */
export class User {
  name: string = "";
  lastName: string = "";
  address: string = "";
  password: string = "";
  email: string = "";
  id: number = 0;
}