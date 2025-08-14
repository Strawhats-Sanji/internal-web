import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class NavbarComponent implements OnInit {
  currentUser: User | null = null;
  drawerOpen = false;
  
  // Navbar dropdown states (separate from drawer)
  navbarInternalServicesOpen = false;
  navbarIdrsSubmenuOpen = false;
  navbarItSupportOpen = false;
  
  // Drawer accordion states (separate from navbar)
  drawerInternalServicesOpen = false;
  drawerIdrsSubmenuOpen = false;
  drawerItSupportOpen = false;

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
    }, 300); // Increased to 300ms to give more time for navigation
  }

  // IT Support dropdown handlers
  onItSupportMouseEnter() {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }
    this.navbarItSupportOpen = true;
  }

  onItSupportMouseLeave() {
    this.closeTimeout = setTimeout(() => {
      this.navbarItSupportOpen = false;
    }, 150);
  }

  onItDropdownMouseEnter() {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }
  }

  onItDropdownMouseLeave() {
    this.closeTimeout = setTimeout(() => {
      this.navbarItSupportOpen = false;
    }, 300);
  }

  // Prevent closing when clicking on menu items
  onMenuItemClick() {
    // Keep dropdown open briefly to allow navigation
    setTimeout(() => {
      this.navbarInternalServicesOpen = false;
      this.navbarIdrsSubmenuOpen = false;
    }, 100);
  }

  // IDRS submenu should be click-based, not hover-based
  toggleIdrsSubmenu() {
    this.navbarIdrsSubmenuOpen = !this.navbarIdrsSubmenuOpen;
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

  toggleDrawerItSupport() {
    this.drawerItSupportOpen = !this.drawerItSupportOpen;
  }

  isActiveRoute(route: string): boolean {
    return this.router.url === route;
  }
}
