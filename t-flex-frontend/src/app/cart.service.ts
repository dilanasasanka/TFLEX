import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {


  private baseUrl = 'http://localhost:8080/api'; // Replace with your actual backend API base URL

  constructor(private http: HttpClient, private authService: AuthService) {}

  getCartItems(): Observable<any[]> {
    const userId = this.authService.getUserId();
    console.log(userId)

    if (userId === null) {
      // Handle the case where the user's ID is not available
      console.error('User ID is not available.');
      return of([]); // Return an empty array or handle it according to your logic
    }

    const url = `${this.baseUrl}/cart/${userId}`;
    return this.http.get<any[]>(url);
  }

  

  addToCart(cartItem: any): Observable<any> {
    const url = `${this.baseUrl}/cart/add`;
    return this.http.post(url, cartItem, { responseType: 'json' });
  }

  updateCartItemQuantity(cartItem: any): Observable<any> {
    const url = `${this.baseUrl}/cart/update`; // Adjust the endpoint for updating cart item quantity
    return this.http.put(url, cartItem, { responseType: 'json' });
  }

  removeCartItem(userId: number, productId: string): Observable<any> {
    const url = `${this.baseUrl}/cart/remove/${userId}/${productId}`;
    return this.http.delete(url, { responseType: 'json' });
  }


}
