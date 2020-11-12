import { Order } from './order';

export interface User {
  id: number,
  name: string,
  surname: string,
  email: string,
  password: string,
  isAdmin: boolean,
  orders?: Order[],
}
