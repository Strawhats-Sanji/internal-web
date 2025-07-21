import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from '../shared/navbar/navbar';
import { VerificationService, VerificationResult } from './services/verification.service';

@Component({
  selector: 'app-verification-page',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, HttpClientModule],
  templateUrl: './verification-page.component.html',
  styleUrls: ['./verification-page.component.scss']
})
export class VerificationPageComponent {
  bvnNumber: string = '';
  ninNumber: string = '';

  bvnLoading = false;
  ninLoading = false;

  verificationResult: VerificationResult | null = null;
  errorMessage: string | null = null;

  showSuccessModal = false;
  showErrorModal = false;

  constructor(private verificationService: VerificationService) {}

  handleVerification(type: 'nin' | 'bvn') {
    const number = type === 'nin' ? this.ninNumber : this.bvnNumber;
    if (type === 'nin') {
      this.ninLoading = true;
    } else {
      this.bvnLoading = true;
    }
    this.resetModals();

    this.verificationService.verify(type, number).subscribe({
      next: (result) => {
        this.verificationResult = result;
        this.showSuccessModal = true;
        this.stopLoading(type);
      },
      error: (err) => {
        this.errorMessage = err.message || 'An unknown error occurred.';
        this.showErrorModal = true;
        this.stopLoading(type);
      }
    });
  }

  private stopLoading(type: 'nin' | 'bvn') {
    if (type === 'nin') {
      this.ninLoading = false;
    } else {
      this.bvnLoading = false;
    }
  }

  resetModals() {
    this.showSuccessModal = false;
    this.showErrorModal = false;
    this.verificationResult = null;
    this.errorMessage = null;
  }
} 