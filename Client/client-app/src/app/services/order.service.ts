import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order';
import { Observable } from 'rxjs';
import { CreateOrderDTO } from '../models/createOrderDto';
import { ErrorResponse } from '../models/errorResponse';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  public addOrder(createOrderDTO: CreateOrderDTO): Observable<Order>{
    return this.httpClient.post<Order>('orders/add', createOrderDTO);
  }

  public deleteOrder(id: number): Observable<ErrorResponse>{
    return this.httpClient.delete<ErrorResponse>(`orders/delete/${id}`);
  }
}
