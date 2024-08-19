// Create an abstract UserServiceInterface
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class UserServiceInterface {
  abstract login(loginData: any): Observable<any>;
  abstract register(registerData: any): Observable<any>;
}
