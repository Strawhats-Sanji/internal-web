import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, User } from '../../services/auth.service';

export interface ProfileData {
  firstName: string;
  lastName: string;
  department: string;
  position: string;
  phoneNumber: string;
  employeeId: string;
  supervisor: string;
  workLocation: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
}

@Component({
  selector: 'app-get-started-guide',
  imports: [CommonModule, FormsModule],
  templateUrl: './get-started-guide.html',
  styleUrl: './get-started-guide.scss'
})
export class GetStartedGuideComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>();
  
  currentStep = 1;
  totalSteps = 3;
  isVisible = false;
  currentUser: User | null = null;
  
  profileData: ProfileData = {
    firstName: '',
    lastName: '',
    department: '',
    position: '',
    phoneNumber: '',
    employeeId: '',
    supervisor: '',
    workLocation: '',
    emergencyContact: {
      name: '',
      relationship: '',
      phone: ''
    }
  };

  departments = [
    'Information Technology',
    'Human Resources',
    'Finance',
    'Operations',
    'Customer Service',
    'Marketing',
    'Legal',
    'Compliance',
    'Risk Management',
    'Internal Audit'
  ];

  workLocations = [
    'Head Office - Lagos',
    'Branch Office - Abuja',
    'Branch Office - Port Harcourt',
    'Branch Office - Kano',
    'Branch Office - Kaduna',
    'Remote Work'
  ];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      // Pre-populate with available user data
      const nameParts = this.currentUser.name.split(' ');
      this.profileData.firstName = nameParts[0] || '';
      this.profileData.lastName = nameParts.slice(1).join(' ') || '';
    }
    
    // Auto-show the modal when component is created
    this.show();
  }

  show() {
    this.isVisible = true;
    this.currentStep = 1;
  }

  hide() {
    this.isVisible = false;
    this.closeModal.emit();
  }

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  isStepValid(): boolean {
    switch (this.currentStep) {
      case 1:
        return !!(this.profileData.firstName && this.profileData.lastName && 
                 this.profileData.department && this.profileData.position);
      case 2:
        return !!(this.profileData.phoneNumber && this.profileData.employeeId && 
                 this.profileData.supervisor && this.profileData.workLocation);
      case 3:
        return !!(this.profileData.emergencyContact.name && 
                 this.profileData.emergencyContact.relationship && 
                 this.profileData.emergencyContact.phone);
      default:
        return false;
    }
  }

  completeSetup() {
    if (this.isStepValid()) {
      // Here you would typically save the profile data to your backend
      console.log('Profile data to save:', this.profileData);
      
      // For now, we'll just close the modal
      this.hide();
      
      // You could also show a success message or redirect
      alert('Profile setup completed successfully!');
    }
  }

  getStepTitle(): string {
    switch (this.currentStep) {
      case 1:
        return 'Basic Information';
      case 2:
        return 'Work Details';
      case 3:
        return 'Emergency Contact';
      default:
        return '';
    }
  }

  getStepDescription(): string {
    switch (this.currentStep) {
      case 1:
        return 'Please provide your basic personal and professional information.';
      case 2:
        return 'Tell us about your work details and location.';
      case 3:
        return 'Add an emergency contact for safety purposes.';
      default:
        return '';
    }
  }
} 