import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { CartTotalService } from '../cart-total.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: any; 
  baseImageUrl: string = '/assets/images/';
  selectedQuantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private authService: AuthService, 
    private router: Router,
    private cartTotalService: CartTotalService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.params['productId'];

    this.productService.getProduct(productId).subscribe(
      (data) => {
      this.product = data;
      console.log(this.product);
    },
    (error) => {
      console.error('Error fetching product:', error);
    });
  }

  addToCart(productId: any): void {
    if (this.authService.isLoggedIn()) {
      const cartItem = {
        productId: productId,
        quantity: this.selectedQuantity,
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
