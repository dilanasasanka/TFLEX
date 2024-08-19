// cart-total.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartTotalService {
  private cartTotalSubject = new BehaviorSubject<number>(0);
  cartTotal$ = this.cartTotalSubject.asObservable();

  setCartTotal(total: number) {
    this.cartTotalSubject.next(total);
  }

  incrementTotal(amount: number) {
    const currentTotal = this.cartTotalSubject.value;
    this.cartTotalSubject.next(currentTotal + amount);
  }
}
