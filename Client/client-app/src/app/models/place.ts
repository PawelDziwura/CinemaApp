import { Order } from './order';

export interface Place{
  id: number,
  number: number,
  isFree: boolean,
  isSelected: boolean,
  order: Order,
}
