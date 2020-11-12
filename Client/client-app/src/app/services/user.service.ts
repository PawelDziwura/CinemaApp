import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/apiResponse';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;

  constructor(private httpClient: HttpClient) { }

  public createUser(user: User): Observable<User> {
    return this.httpClient.post<User>('user', user);
  }

  public editUser(user: User): Observable<User>{
    return this.httpClient.post<User>('users/edit', user);
  }

  public register(user: User): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>('register', user);
  }

  public saveUser(user: User){
    this.user = user;
    sessionStorage.setItem('cinema-app-user', JSON.stringify(user));
  }

  public saveToken(token: string){
    sessionStorage.setItem('cinema-app-token', token);
  }

  public getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>('users');
  }

  public getById(id: number): Observable<User>{
    return this.httpClient.get<User>(`users/${id}`)
  }

  public getUser(): User{
    var user = JSON.parse(sessionStorage.getItem('cinema-app-user'));
    if(user)
      this.user = user;
    return user;
  }

  public auth(user: User): Observable<ApiResponse>{
    return this.httpClient.post<ApiResponse>('login',user);
  }

  logout() {
    this.user = null;
    sessionStorage.removeItem('cinema-app-token');
    sessionStorage.removeItem('cinema-app-user');
  }
}
