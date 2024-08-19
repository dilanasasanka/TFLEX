import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';
import { CartTotalService } from '../cart-total.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  cartTotal: number = 0;


  constructor(private authService: AuthService, private cartTotalService: CartTotalService, private router: Router) {}
  ngOnInit(): void {
    this.cartTotalService.cartTotal$.subscribe((total) => {
      this.cartTotal = total;
    });
  }

  // Check if the user is logged in using the AuthService
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logOut(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  navLinks = [
    { path: '/', label: 'Home' },
    { path: '/men', label: 'Men' },
    { path: '/women', label: 'Women' },
    { path: '/sale', label: 'Sale' }
  ];

  
}
