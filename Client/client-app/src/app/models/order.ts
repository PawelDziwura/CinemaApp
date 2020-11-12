import { Seance } from './seance';
import { Place } from './place';
import { User } from './user';

export interface Order{
  id: number,
  orderSeance: Seance,
  places: Place[],
  isRefundable: boolean,
  orderUser: User;
}
