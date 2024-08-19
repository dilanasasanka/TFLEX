import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserServiceInterface } from './UserServiceInterface';

@Injectable({
  providedIn: 'root'
})
export class UserService implements UserServiceInterface {
  private baseUrl = 'http://localhost:8080/api'; // Replace with your Spring Boot backend URL

  constructor(private http: HttpClient) {}

  login(loginData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Send a POST request with loginData to the login endpoint
    return this.http.post(`${this.baseUrl}/login`, loginData, { headers });
  }

  register(registerData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, registerData);
  }
}
