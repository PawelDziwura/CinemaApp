import { Movie } from './movie';
import { Place } from './place';

export interface Seance{
  id: number,
  startDate: Date,
  endDate: Date,
  movie: Movie,
  places: Place[],
}
