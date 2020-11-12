import { Seance } from './seance';

export interface Ticket{
  id: number,
  price: number,
  ticketSeance: Seance,
}
