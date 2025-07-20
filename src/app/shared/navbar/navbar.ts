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
  
  // Navbar dropdown states (separate from drawer)
  navbarInternalServicesOpen = false;
  navbarIdrsSubmenuOpen = false;
  
  // Drawer accordion states (separate from navbar)
  drawerInternalServicesOpen = false;
  drawerIdrsSubmenuOpen = false;

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

  // Navbar mouseover handlers with delay
  private closeTimeout: any;

  onInternalServicesMouseEnter() {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }
    this.navbarInternalServicesOpen = true;
  }

  onInternalServicesMouseLeave() {
    this.closeTimeout = setTimeout(() => {
      this.navbarInternalServicesOpen = false;
      this.navbarIdrsSubmenuOpen = false;
    }, 150); // 150ms delay before closing
  }

  onDropdownMouseEnter() {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }
  }

  onDropdownMouseLeave() {
    this.closeTimeout = setTimeout(() => {
      this.navbarInternalServicesOpen = false;
      this.navbarIdrsSubmenuOpen = false;
    }, 200); // Increased to 200ms for better user experience
  }

  // Prevent closing when clicking on menu items
  onMenuItemClick() {
    // Keep dropdown open briefly to allow navigation
    setTimeout(() => {
      this.navbarInternalServicesOpen = false;
      this.navbarIdrsSubmenuOpen = false;
    }, 100);
  }

  onIdrsSubmenuMouseEnter() {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }
    this.navbarIdrsSubmenuOpen = true;
  }

  onIdrsSubmenuMouseLeave() {
    this.closeTimeout = setTimeout(() => {
      this.navbarIdrsSubmenuOpen = false;
    }, 150); // 150ms delay before closing
  }

  // Drawer handlers (separate from navbar)
  openDrawer() {
    this.drawerOpen = true;
  }

  closeDrawer() {
    this.drawerOpen = false;
  }

  logout() {
    this.authService.logout();
  }

  // Drawer accordion handlers (separate from navbar)
  toggleDrawerInternalServices() {
    this.drawerInternalServicesOpen = !this.drawerInternalServicesOpen;
  }

  toggleDrawerIdrsSubmenu() {
    this.drawerIdrsSubmenuOpen = !this.drawerIdrsSubmenuOpen;
  }

  isActiveRoute(route: string): boolean {
    return this.router.url === route;
  }
}
