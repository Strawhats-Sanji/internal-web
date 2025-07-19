import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-page',
  imports: [CommonModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss'
})
export class LoginPageComponent {
  loading = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    // Redirect to landing page since we don't need a separate login page
    this.router.navigate(['/']);
  }

  onLogin(event: Event) {
    event.preventDefault();
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.router.navigate(['/dashboard']);
    }, 1500);
  }

  loginWithAD() {
    this.loading = true;
    this.authService.loginWithAD();
  }
}
