import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class NavbarComponent implements OnInit {
  currentUser: User | null = null;
  drawerOpen = false;
  internalServicesOpen = false;
  idrsSubmenuOpen = false;

  // Internal Services Data
  internalServices = [
    {
      name: 'IDRS Service',
      hasSubmenu: true,
      submenu: [
        { name: 'Search', route: '/idrs/search' },
        { name: 'Report', route: '/idrs/report' },
        { name: 'View', route: '/idrs/view' }
      ]
    },
    { name: 'Verification', route: '/verification' },
    { name: 'Returns', route: '/returns' }
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

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

  toggleInternalServices() {
    this.internalServicesOpen = !this.internalServicesOpen;
  }

  toggleIdrsSubmenu() {
    this.idrsSubmenuOpen = !this.idrsSubmenuOpen;
  }

  isActiveRoute(route: string): boolean {
    return this.router.url === route;
  }
}
