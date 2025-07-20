import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, User } from '../services/auth.service';
import { NavbarComponent } from '../shared/navbar/navbar';

interface DashboardCard {
  title: string;
  value: string;
  percentage: string;
  trend: 'positive' | 'negative';
  icon: string;
}

interface LiveAlert {
  exceptionName: string;
  riskLevel: 'High' | 'Medium' | 'Low';
  status: string;
  deadline: string;
  action: string;
}

interface HistoryEntry {
  exceptionName: string;
  action: string;
  by: string;
  dateTime: string;
}

@Component({
  selector: 'app-returns-page',
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './returns-page.html',
  styleUrl: './returns-page.scss'
})
export class ReturnsPageComponent implements OnInit {
  currentUser: User | null = null;
  drawerOpen = false;
  
  // Return form data
  returnData = {
    returnName: '',
    returnDetails: '',
    frequency: '',
    recipient: '',
    dueDate: '',
    internalTimeline: '',
    evidence: null as File | null
  };

  // Dashboard Overview Cards
  dashboardCards: DashboardCard[] = [
    {
      title: 'Total Assigned Returns',
      value: '12/50',
      percentage: '+26%',
      trend: 'positive',
      icon: '📄'
    },
    {
      title: 'Awaiting Approval',
      value: '34/50',
      percentage: '+26%',
      trend: 'positive',
      icon: '✅'
    },
    {
      title: 'Returned for Rework',
      value: '12/50',
      percentage: '+26%',
      trend: 'positive',
      icon: '🔄'
    },
    {
      title: 'Pending Submissions',
      value: '18/34',
      percentage: '+26%',
      trend: 'negative',
      icon: '📋'
    },
    {
      title: 'Overdue',
      value: '12/50',
      percentage: '+26%',
      trend: 'negative',
      icon: '⏰'
    }
  ];

  // Live Alerts Data
  liveAlerts: LiveAlert[] = [
    {
      exceptionName: 'KYC Violation',
      riskLevel: 'High',
      status: 'In Progress',
      deadline: 'Apr 2',
      action: 'Continue'
    },
    {
      exceptionName: 'AML Compliance',
      riskLevel: 'Medium',
      status: 'Under review',
      deadline: 'Jun 30',
      action: 'Update'
    },
    {
      exceptionName: 'Data Privacy Audit',
      riskLevel: 'Medium',
      status: 'Submitted',
      deadline: 'April 2',
      action: 'View'
    },
    {
      exceptionName: 'Q1 Financial Report',
      riskLevel: 'Medium',
      status: 'Pending',
      deadline: 'Aug 29',
      action: 'View'
    },
    {
      exceptionName: 'AML Compliance',
      riskLevel: 'Medium',
      status: 'Pending',
      deadline: 'April 2',
      action: 'Update'
    },
    {
      exceptionName: 'Late Tax Filing',
      riskLevel: 'High',
      status: 'Overdue',
      deadline: 'Mar 17',
      action: 'Escalate'
    }
  ];

  // History & Audit Data
  historyEntries: HistoryEntry[] = [
    {
      exceptionName: 'AML Compliance Delay',
      action: 'Submitted Evidence',
      by: 'User 2',
      dateTime: 'April 5, 2025, 3:45pm'
    },
    {
      exceptionName: 'Late Tax Filing',
      action: 'Reviewed',
      by: 'Supervisor',
      dateTime: 'May 5, 2025'
    },
    {
      exceptionName: 'KYC Breach Report',
      action: 'Overdue',
      by: 'CCO',
      dateTime: 'April 5, 2025'
    },
    {
      exceptionName: 'AML Compliance Delay',
      action: 'Returned',
      by: 'CCO',
      dateTime: 'April 5, 2025'
    },
    {
      exceptionName: 'AML Compliance Delay',
      action: 'Pending',
      by: 'Supervisor',
      dateTime: 'April 5, 2025'
    },
    {
      exceptionName: 'Late Tax Filing',
      action: 'Approved',
      by: 'Supervisor',
      dateTime: 'April 5, 2025'
    },
    {
      exceptionName: 'KYC Breach Report',
      action: 'Modified',
      by: 'User 2',
      dateTime: 'April 5, 2025'
    }
  ];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
  }

  openDrawer() {
    this.drawerOpen = true;
  }

  closeDrawer() {
    this.drawerOpen = false;
  }

  logout() {
    this.authService.logout();
  }

  getRiskLevelColor(level: string): string {
    switch (level) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-orange-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  }

  getActionButtonClass(action: string): string {
    switch (action) {
      case 'Continue': return 'bg-blue-500 hover:bg-blue-600';
      case 'Update': return 'bg-yellow-500 hover:bg-yellow-600';
      case 'View': return 'bg-green-500 hover:bg-green-600';
      case 'Escalate': return 'bg-red-500 hover:bg-red-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  }

  // Form submission method
  submitReturn() {
    if (this.returnData.returnName && this.returnData.returnDetails && 
        this.returnData.frequency && this.returnData.recipient && 
        this.returnData.dueDate && this.returnData.internalTimeline) {
      
      console.log('Submitting return data:', this.returnData);
      
      // TODO: Integrate with backend API
      // Example API call:
      // this.returnsService.submitReturn(this.returnData).subscribe({
      //   next: (response) => {
      //     console.log('Return submitted successfully:', response);
      //     // Reset form or show success message
      //   },
      //   error: (error) => {
      //     console.error('Error submitting return:', error);
      //     // Show error message
      //   }
      // });
      
      // For now, just show success message
      alert('Return submitted successfully! Backend integration pending.');
      
      // Reset form
      this.returnData = {
        returnName: '',
        returnDetails: '',
        frequency: '',
        recipient: '',
        dueDate: '',
        internalTimeline: '',
        evidence: null
      };
    } else {
      alert('Please fill in all required fields.');
    }
  }

  // File upload handler
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.returnData.evidence = file;
      console.log('File selected:', file.name);
    }
  }
}
