import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface User {
  name: string;
  email: string;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private readonly AD_ENDPOINT = `${environment.adService.baseUrl}${environment.adService.authEndpoint}`;
  private readonly CALLBACK_URL = `${window.location.origin}/auth/callback`;

  constructor(private router: Router) {
    this.loadUserFromStorage();
  }

  /**
   * Initiate AD authentication
   */
  loginWithAD(): void {
    const loginUrl = `${this.AD_ENDPOINT}?redirect_uri=${encodeURIComponent(this.CALLBACK_URL)}`;
    console.log('Redirecting to AD service:', loginUrl);
    console.log('Callback URL:', this.CALLBACK_URL);
    window.location.href = loginUrl;
  }

  /**
   * Handle authentication callback from AD service
   */
  handleAuthCallback(): Promise<User | null> {
    return new Promise((resolve, reject) => {
      try {
        console.log('Handling auth callback...');
        const params = new URLSearchParams(window.location.search);
        console.log('URL params:', Object.fromEntries(params.entries()));
        
        const name = params.get('name');
        const email = params.get('email');
        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');
        const expiresIn = params.get('expires_in');

        console.log('Extracted params:', { name, email, accessToken: !!accessToken, refreshToken: !!refreshToken, expiresIn });

        if (name && email) {
          const user: User = {
            name,
            email,
            accessToken: accessToken || undefined,
            refreshToken: refreshToken || undefined,
            expiresAt: expiresIn ? Date.now() + (parseInt(expiresIn) * 1000) : undefined
          };

          console.log('Creating user object:', user);
          this.setCurrentUser(user);
          resolve(user);
        } else {
          console.log('Missing required params: name or email');
          reject(new Error('Invalid authentication response'));
        }
      } catch (error) {
        console.error('Error in handleAuthCallback:', error);
        reject(error);
      }
    });
  }

  /**
   * Get current user
   */
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    const user = this.getCurrentUser();
    if (!user) return false;
    
    // Check if token is expired
    if (user.expiresAt && Date.now() > user.expiresAt) {
      this.logout();
      return false;
    }
    
    return true;
  }

  /**
   * Set current user and save to storage
   */
  private setCurrentUser(user: User): void {
    this.currentUserSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  /**
   * Load user from localStorage
   */
  private loadUserFromStorage(): void {
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        this.currentUserSubject.next(user);
      }
    } catch (error) {
      console.error('Error loading user from storage:', error);
      this.logout();
    }
  }

  /**
   * Logout user
   */
  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

  /**
   * Refresh access token
   */
  async refreshToken(): Promise<boolean> {
    const user = this.getCurrentUser();
    if (!user?.refreshToken) return false;

    try {
      // Implement token refresh logic here
      // This would typically make a request to your AD service
      const response = await fetch(`${environment.adService.baseUrl}${environment.adService.refreshEndpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refresh_token: user.refreshToken
        })
      });

      if (response.ok) {
        const data = await response.json();
        const updatedUser = {
          ...user,
          accessToken: data.access_token,
          expiresAt: Date.now() + (data.expires_in * 1000)
        };
        this.setCurrentUser(updatedUser);
        return true;
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
    }

    return false;
  }
} 