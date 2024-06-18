import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  user = {
    firstName: '',
    secondName: '',
    email: '',
    password: ''
  };

  confirmPassword = '';
  passwordsMatch = false;
  errorMessage = '';
  showPassword = false;

  constructor(
    private service: AuthService,
    private router: Router
  ) { }

  checkPasswordMatch() {
    this.passwordsMatch = this.user.password === this.confirmPassword;
  }

  isValidEmail(email: string) {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return pattern.test(email);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  register() {
    if (!this.isValidEmail(this.user.email)) {
      this.errorMessage = 'Please enter a valid email address';
      return;
    }

    if (this.user.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.service.register(this.user).subscribe({
      next: (response) => {
        if (response.message === 'User already exists') {
          this.errorMessage = 'User already exists';
        } else {
          this.router.navigate(['/login']);
        }
      },
      error: (error) => {
        console.error('Registration failed:', error);
        this.errorMessage = 'Registration failed';
      }
    });
  }
}
