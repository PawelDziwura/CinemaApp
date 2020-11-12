import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Seance } from '../models/seance';
import { Observable } from 'rxjs';
import { Place } from '../models/place';
import { Order } from '../models/order';
import { ApiResponse } from '../models/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class SeanceService {

  constructor(private httpClient: HttpClient) { }

  public addSeance(seance: Seance): Observable<ApiResponse>{
    return this.httpClient.post<ApiResponse>('seance/add', seance);
  }

  public addPlaces(places: Place[]): Observable<Place[]>{
    return this.httpClient.post<Place[]>('places/add', places);
  }

  public getSeanceById(id: number): Observable<Seance>{
    return this.httpClient.get<Seance>(`seances/${id}`);
  }

  public updateSeance(seance: Seance){
    return this.httpClient.post<Seance>('seance/update', seance);
  }

  public deleteSeance(id: number): Observable<{}>{
    return this.httpClient.delete<Seance>(`seances/delete/${id}`);
  }
}
