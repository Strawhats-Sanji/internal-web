import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
  imports: [CommonModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss'
})
export class LoginPageComponent {
  loading = false;

  constructor(private router: Router) {}

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
    // Replace with your real access token
    const accessToken = 'YOUR_ACCESS_TOKEN';
    const endpoint = 'https://apigateway-test.summitbankng.com/auth/v1/redirect';
    // Redirect with Authorization header is not possible from browser, so use backend or allow endpoint to accept token as query param if supported
    // For now, just redirect to endpoint (token handling must be implemented securely)
    window.location.href = endpoint;
  }
}
