import { Seance } from './seance';

export interface Hall{
  id: number,
  openDate: Date,
  closeDate: Date,
  seances: Seance[],
}
