import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../shared/navbar/navbar';

@Component({
  selector: 'app-verification-page',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './verification-page.component.html',
  styleUrls: ['./verification-page.component.scss']
})
export class VerificationPageComponent {
  bvnNumber: string = '';
  ninNumber: string = '';

  bvnLoading = false;
  ninLoading = false;

  bvnResult: { success: boolean, message: string } | null = null;
  ninResult: { success: boolean, message: string } | null = null;

  handleBvnSubmit() {
    this.bvnLoading = true;
    this.bvnResult = null;
    console.log('Verifying BVN:', this.bvnNumber);
    // Simulate API call
    setTimeout(() => {
      this.bvnLoading = false;
      this.bvnResult = { success: true, message: `BVN ${this.bvnNumber} verified successfully.` };
    }, 1500);
  }

  handleNinSubmit() {
    this.ninLoading = true;
    this.ninResult = null;
    console.log('Verifying NIN:', this.ninNumber);
    // Simulate API call
    setTimeout(() => {
      this.ninLoading = false;
      this.ninResult = { success: true, message: `NIN ${this.ninNumber} verified successfully.` };
    }, 1500);
  }
} 