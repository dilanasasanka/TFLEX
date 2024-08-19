// login.component.ts

import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginData = {
    username: '',
    password: '',
  };

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit() {
    this.userService.login(this.loginData).subscribe(
      (data) => {
        // Handle successful login
        this.authService.login(data.name, data['user id']);// Store user details
        this.router.navigate(['/home']);

        console.log(data['user id']);
      },
      (error) => {
        // Handle login error
        console.error('Login failed: ', error);
      }
    );
  }
}
