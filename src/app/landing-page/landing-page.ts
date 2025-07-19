import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-landing-page',
  imports: [CommonModule],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss'
})
export class LandingPageComponent implements OnInit {
  loading = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // If user is already authenticated, redirect to dashboard
    if (this.authService.isAuthenticated()) {
      console.log('User already authenticated, redirecting to dashboard');
      this.router.navigate(['/dashboard']);
    }
  }

  loginWithAD() {
    this.loading = true;
    this.authService.loginWithAD();
  }
}
