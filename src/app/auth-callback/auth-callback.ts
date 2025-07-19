import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-callback',
  imports: [],
  templateUrl: './auth-callback.html',
  styleUrl: './auth-callback.scss'
})
export class AuthCallbackComponent {
  loading = true;
  error: string | null = null;

  constructor(private router: Router) {
    // Simulate extracting payload from query or fragment
    // In real implementation, parse window.location.search or window.location.hash
    try {
      // Example: ?name=Staff%20Name&email=staffname@summitbankng.com
      const params = new URLSearchParams(window.location.search);
      const name = params.get('name');
      const email = params.get('email');
      if (name && email) {
        localStorage.setItem('user', JSON.stringify({ name, email }));
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1000);
      } else {
        this.error = 'Invalid login response.';
      }
    } catch (e) {
      this.error = 'Error processing login response.';
    }
  }
}
