import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, User } from '../services/auth.service';
import { NavbarComponent } from '../shared/navbar/navbar';

@Component({
  selector: 'app-dashboard-page',
  imports: [CommonModule, NavbarComponent],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss'
})
export class DashboardPageComponent implements OnInit {
  drawerOpen = false;
  currentUser: User | null = null;
  currentSlide = 0;
  totalSlides = 3;
  internalServicesOpen = false;
  idrsSubmenuOpen = false;

  // Services data
  services = [
    {
      name: 'IDRS Service',
      hasSubmenu: true,
      submenu: [
        { name: 'Search', link: '/idrs/search' },
        { name: 'Report', link: '/idrs/report' },
        { name: 'View', link: '/idrs/view' }
      ]
    },
    { name: 'Verification', link: '/verification' },
    { name: 'Returns', link: '/returns' }
  ];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    // Auto-advance slider every 5 seconds
    setInterval(() => {
      this.nextSlide();
    }, 5000);
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

  // Slider methods
  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
  }

  previousSlide() {
    this.currentSlide = this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  // Dropdown/Accordion methods
  toggleInternalServices() {
    this.internalServicesOpen = !this.internalServicesOpen;
  }

  toggleIdrsSubmenu() {
    this.idrsSubmenuOpen = !this.idrsSubmenuOpen;
  }
}
