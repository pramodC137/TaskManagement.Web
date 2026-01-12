import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  @Output() loginSuccess = new EventEmitter<void>();

  isLoginMode = true;
  username = '';
  password = '';
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService) {}

  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = '';
    this.successMessage = '';
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.username || !this.password) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    if (!this.isLoginMode && this.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters';
      return;
    }

    const credentials = {
      username: this.username,
      password: this.password
    };

    if(this.isLoginMode) {
      this.authService.login(credentials).subscribe({
          next: () => {
            this.successMessage = this.isLoginMode ? 'Login successful' : 'Registration successful';
            setTimeout(() => this.loginSuccess.emit(), 500);
          },
          error: (err) => {
            this.errorMessage = err.error?.message || 'An error occurred';
          }
      });

    } else {
      this.authService.register(credentials).subscribe({
          next: () => {
            this.successMessage = this.isLoginMode ? 'Login successful' : 'Registration successful';
            setTimeout(() => this.loginSuccess.emit(), 500);
          },
          error: (err) => {
            this.errorMessage = err.error?.message || 'An error occurred';
          }
      });
    }
    
    // const action = this.isLoginMode 
    //   ? this.authService.login(credentials)
    //   : this.authService.register(credentials);

    // action.subscribe({
    //   next: () => {
    //     this.successMessage = this.isLoginMode ? 'Login successful' : 'Registration successful';
    //     setTimeout(() => this.loginSuccess.emit(), 500);
    //   },
    //   error: (err) => {
    //     this.errorMessage = err.error?.message || 'An error occurred';
    //   }
    // });
  }
}