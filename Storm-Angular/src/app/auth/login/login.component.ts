import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  loginForm: FormGroup;
  hidePassword: boolean = true;

  constructor(
    private service: AuthService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  

  login(): Subscription {
    return this.service.login(
      this.loginForm.get(['email'])!.value,
      this.loginForm.get(['password'])!.value,
    ).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['/user/announcements:userId']);
      },
      error: (error) => {
        if (error.status == 406) {
          this.snackbar.open("User is not active", "Close", {
            duration: 5000
          });
        } else if (error.status == 401) {
          this.snackbar.open("Invalid email or password", "Close", {
            duration: 5000
          });
        } else {
          this.snackbar.open("Bad credentials", "Close", {
            duration: 5000
          });
        }
      }
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}