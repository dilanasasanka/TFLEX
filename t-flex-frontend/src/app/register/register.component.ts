import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UserServiceInterface } from '../UserServiceInterface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{
  registerData = {
    username: '',
    password: '',
    confirmPassword: '',
  };

  registrationSuccess = false;
  registrationError = '';

  constructor(private userService: UserService) {}

  onSubmit() {
    if (this.registerData.password !== this.registerData.confirmPassword) {
      this.registrationError = "Passwords don't match.";
      return;
    }

    this.userService.register(this.registerData).subscribe(
      (data) => {
        this.registrationSuccess = true;
        this.registrationError = ''; // Clear any previous error messages
        // You can optionally redirect to the login page or show a success message
        alert('Registration Successful! Let(\')s Begin Shopping with Tflex.');
      },
      (error) => {
        this.registrationSuccess = false;
        this.registrationError = 'Registration failed. Please try again.'; // Customize the error message as needed
        alert('Tflex says: Registration Successful! Let(\')s Begin Shopping with Tflex.');

      }
    );
  }
}
