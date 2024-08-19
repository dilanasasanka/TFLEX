import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CartService } from '../cart.service';
import { ProductService } from '../product.service';
import { forkJoin } from 'rxjs';
import { CartTotalService } from '../cart-total.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  product: any; 
  cartItems: any[] = [];
  products: any[] = [];
  baseImageUrl: string = '/assets/images/';

  constructor(private cartService: CartService, private productService: ProductService,
    private cartTotalService: CartTotalService, private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchCartItems();
    
  }

  fetchCartItems() {
    this.cartService.getCartItems().subscribe(
      (items) => {
        this.cartItems = items;
        console.log("Cart Items:", this.cartItems); // Log the cart items to the console
        this.fetchProductsForCartItems();
      },
      (error) => {
        console.error(`Error fetching cart items: ${error}`);
      }
    );
  }
  

  fetchProductsForCartItems() {
  const fetchProductObservables = this.cartItems.map((cartItem) => {
    return this.productService.getProduct(cartItem.productId); // Use cartItem.productId
  });

  // Use forkJoin to wait for all Observables to complete
  forkJoin(fetchProductObservables).subscribe(
    (productResponses: any[]) => {
      this.products = productResponses;
      console.log(this.products);
      this.calculateTotal();
    },
    (error) => {
      console.error(`Error fetching products: ${error}`);
    }
  );
}

getQuantityForProduct(productId: number): number {
  const cartItem = this.cartItems.find((item) => item.productId === productId);
  return cartItem ? cartItem.quantity : 0;
}

removeFromCart(productId: string): void {
  const userId = this.authService.getUserId(); // Get the user's ID

  if (!userId) {
    console.error("User ID is not available.");
    return;
  }

  // Call the removeCartItem method from CartService to remove the item from the cart
  this.cartService.removeCartItem(userId, productId).subscribe(
    (response) => {
      console.log("Item removed from cart:", response);

      // After successfully removing the item, update the cart items and total
      this.fetchCartItems();
    },
    (error) => {
      console.error(error);
    }
  );
}



  calculateTotal(): number {
    let total = 0;
    for (const item of this.cartItems) {
      const product = this.products.find((p) => p.id === item.productId);
      if (product) {
        total += product.price * item.quantity;
      }
    }
    console.log(total)
    this.cartTotalService.setCartTotal(total);
    return total;
  }
}
