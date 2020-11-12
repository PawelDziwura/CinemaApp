import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/movie';
import { Observable } from 'rxjs';
import { Poster } from '../models/poster';
import { Seance } from '../models/seance';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private httpClient: HttpClient) { }

  public addMovie(movie: Movie): Observable<Movie>{
    return this.httpClient.post<Movie>('movies/add', movie);
  }

  public deleteMovie(id: number): Observable<{}>{
    console.log(id);
    return this.httpClient.delete<Movie>(`movies/delete/${id}`);
  }

  public editMovie(movie: Movie){
    return this.httpClient.post<Movie>('movies/edit', movie);
  }

  public getAll(): Observable<Movie[]>{
    return this.httpClient.get<Movie[]>('movies');
  }

  public getMovie(id: number): Observable<Movie>{
    return this.httpClient.get<Movie>(`movies/${id}`)
  }
}
