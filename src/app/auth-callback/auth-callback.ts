import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { GetStartedGuideComponent } from '../shared/get-started-guide/get-started-guide';

@Component({
  selector: 'app-auth-callback',
  imports: [CommonModule, GetStartedGuideComponent],
  templateUrl: './auth-callback.html',
  styleUrl: './auth-callback.scss'
})
export class AuthCallbackComponent implements OnInit {
  loading = true;
  error: string | null = null;
  showGetStartedGuide = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.handleAuthCallback();
  }

  async handleAuthCallback() {
    try {
      this.loading = true;
      this.error = null;
      const user = await this.authService.handleAuthCallback();
      if (user) {
        // Show get-started guide modal for new users
        this.showGetStartedGuide = true;
      } else {
        console.log('Authentication failed - no user returned');
        this.error = 'Authentication failed. Please try again.';
        this.loading = false;
      }
    } catch (error) {
      this.error = 'Error processing authentication response. Please try again.';
      this.loading = false;
    }
  }

  retryAuth() {
    console.log('Retrying authentication...');
    this.handleAuthCallback();
  }

  onGetStartedGuideClose() {
    this.showGetStartedGuide = false;
    // Navigate to dashboard after modal is closed
    this.router.navigate(['/dashboard']);
  }
}
