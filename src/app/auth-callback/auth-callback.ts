import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth-callback',
  imports: [CommonModule],
  templateUrl: './auth-callback.html',
  styleUrl: './auth-callback.scss'
})
export class AuthCallbackComponent implements OnInit {
  loading = true;
  error: string | null = null;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.handleAuthCallback();
  }

  private async handleAuthCallback() {
    try {
      const user = await this.authService.handleAuthCallback();
      if (user) {
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1000);
      } else {
        this.error = 'Authentication failed.';
        this.loading = false;
      }
    } catch (error) {
      console.error('Auth callback error:', error);
      this.error = 'Error processing authentication response.';
      this.loading = false;
    }
  }
}
