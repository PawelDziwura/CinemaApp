import { Poster } from './poster';
import { Seance } from './seance';

export interface Movie{
  id: number,
  title: string,
  genre: string,
  description: string,
  durationTime: string,
  poster: Poster,
  seances: Seance[],
}
