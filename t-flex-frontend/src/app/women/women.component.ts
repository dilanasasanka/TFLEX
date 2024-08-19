import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CartTotalService } from '../cart-total.service';

@Component({
  selector: 'app-women',
  templateUrl: './women.component.html',
  styleUrls: ['./women.component.css']
})
export class WomenComponent implements OnInit{
  product: any; 
  products_ct: any[] = [];
  baseImageUrl: string = '/assets/images/';

  constructor(private productService: ProductService, private authService: AuthService, private router: Router,
    private cartTotalService: CartTotalService) {}

  ngOnInit(): void {
    this.productService.getProductsByCategory('Women-ct').subscribe((data) => {
      this.products_ct = data;
    });
  }

  addToCart(productId: any): void {
    if (this.authService.isLoggedIn()) {
      const cartItem = {
        productId: productId,
        quantity: 1,
        userId: this.authService.getUserId()
      };

      this.productService.addToCart(cartItem).subscribe(
        (response) => {
          console.log('Product added to cart:', response);
          alert('Product added to cart successfully.');
          console.log(this.productService.getProduct(productId))

          this.productService.getProduct(cartItem.productId).subscribe(
            (product) => {
              const itemTotal = product.price * cartItem.quantity;   
              this.cartTotalService.incrementTotal(itemTotal);
            });
              

        },
        (error) => {
          console.error('Error adding product to cart:', error);
          alert('Error adding product to cart. Please try again.');
        }
      );
    } else {
      this.router.navigate(['/login']);
      // Redirect to the login page or display a message
      // to prompt the user to log in before adding to the cart.
    }
  }
}
