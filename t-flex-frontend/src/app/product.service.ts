import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getProductsByCategory(category: string): Observable<any> {
    const url = `${this.baseUrl}/products/category/${category}`; 
    return this.http.get(url);
  }

  getProduct(productId: string): Observable<any> {
    const url = `${this.baseUrl}/products/id/${productId}`; 
    return this.http.get(url);
  }

addToCart(cartItem: any): Observable<any> {
  const url = `${this.baseUrl}/cart/add`;
  return this.http.post(url, cartItem, { responseType: 'json' });
}

}
