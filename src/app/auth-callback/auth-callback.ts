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
    console.log('Auth callback component initialized');
    console.log('Current URL:', window.location.href);
    console.log('Search params:', window.location.search);
    this.handleAuthCallback();
  }

  private async handleAuthCallback() {
    try {
      console.log('Starting auth callback handling...');
      const user = await this.authService.handleAuthCallback();
      if (user) {
        console.log('Authentication successful, user:', user);
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1000);
      } else {
        console.log('Authentication failed - no user returned');
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
