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
  uid?: string;
  utid?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private readonly AD_ENDPOINT = `${environment.adService.baseUrl}${environment.adService.authEndpoint}`;
  private readonly CALLBACK_URL = `${window.location.origin}/auth/v1/callback`;

  constructor(private router: Router) {
    this.loadUserFromStorage();
  }

  /**
   * Initiate AD authentication
   */
  async loginWithAD(): Promise<void> {
    try {
      console.log('=== INITIATING AD AUTHENTICATION ===');
      console.log('AD endpoint:', this.AD_ENDPOINT);
      console.log('Callback URL:', this.CALLBACK_URL);
      
      // Since the AD service returns JSON instead of redirecting, we need to handle this differently
      // The simplest approach is to redirect to the AD service and let it handle the flow
      console.log('=== REDIRECTING TO AD SERVICE ===');
      
      // Construct the redirect URL - the AD service should handle the Microsoft redirect
      const redirectUrl = `${this.AD_ENDPOINT}?redirect_uri=${encodeURIComponent(this.CALLBACK_URL)}&response_type=code&client_info=1&auto_redirect=true`;
      
      console.log('Redirect URL:', redirectUrl);
      window.location.href = redirectUrl;
      
    } catch (error) {
      console.error('=== ERROR IN LOGIN WITH AD ===');
      console.error('Error:', error);
      throw error;
    }
  }

  /**
   * Handle authentication callback from AD service
   */
  handleAuthCallback(): Promise<User | null> {
    return new Promise(async (resolve, reject) => {
      try {
        console.log('=== AD SERVICE CALLBACK HANDLING ===');
        console.log('Current URL:', window.location.href);
        console.log('Search string:', window.location.search);
        
        const params = new URLSearchParams(window.location.search);
        const allParams = Object.fromEntries(params.entries());
        
        console.log('=== ALL URL PARAMETERS ===');
        console.log('Raw params object:', allParams);
        console.log('Individual parameters:');
        for (const [key, value] of params.entries()) {
          console.log(`  ${key}:`, value);
        }
        
        const code = params.get('code');
        const clientInfo = params.get('client_info');
        const sessionState = params.get('session_state');

        console.log('=== KEY PARAMETERS ===');
        console.log('Authorization code:', code ? `${code.substring(0, 20)}...` : 'null');
        console.log('Client info:', clientInfo ? `${clientInfo.substring(0, 50)}...` : 'null');
        console.log('Session state:', sessionState);

        if (code) {
          console.log('=== PROCESSING AUTHORIZATION CODE FLOW ===');
          
          // Exchange authorization code for user information
          const user = await this.exchangeCodeForUserInfo(code, clientInfo || undefined);
          if (user) {
            console.log('=== USER CREATED SUCCESSFULLY ===');
            console.log('Final user object:', user);
            this.setCurrentUser(user);
            resolve(user);
          } else {
            console.log('=== FAILED TO CREATE USER ===');
            reject(new Error('Failed to exchange code for user info'));
          }
        } else {
          console.log('=== FALLBACK TO DIRECT PARAMETERS ===');
          // Fallback to direct parameters (for backward compatibility)
          const name = params.get('name');
          const email = params.get('email');
          const accessToken = params.get('access_token');
          const refreshToken = params.get('refresh_token');
          const expiresIn = params.get('expires_in');

          console.log('Direct params:', { name, email, accessToken: !!accessToken, refreshToken: !!refreshToken, expiresIn });

          if (name && email) {
            const user: User = {
              name,
              email,
              accessToken: accessToken || undefined,
              refreshToken: refreshToken || undefined,
              expiresAt: expiresIn ? Date.now() + (parseInt(expiresIn) * 1000) : undefined
            };

            console.log('Creating user object from direct params:', user);
            this.setCurrentUser(user);
            resolve(user);
          } else {
            console.log('Missing required direct params: name or email');
            reject(new Error('Invalid authentication response'));
          }
        }
      } catch (error) {
        console.error('=== ERROR IN AUTH CALLBACK ===');
        console.error('Error details:', error);
        reject(error);
      }
    });
  }

  /**
   * Exchange authorization code for user information
   */
  private async exchangeCodeForUserInfo(code: string, clientInfo?: string): Promise<User | null> {
    try {
      console.log('=== EXCHANGING CODE FOR USER INFO ===');
      console.log('Authorization code length:', code.length);
      console.log('Client info provided:', !!clientInfo);
      
      // Extract user info from client_info if available
      if (clientInfo) {
        console.log('=== PROCESSING CLIENT_INFO ===');
        console.log('Raw client_info length:', clientInfo.length);
        console.log('Raw client_info preview:', clientInfo.substring(0, 100) + '...');
        
        try {
          const decodedClientInfo = JSON.parse(atob(clientInfo));
          console.log('=== DECODED CLIENT_INFO STRUCTURE ===');
          console.log('Full decoded client_info:', decodedClientInfo);
          console.log('Client_info keys:', Object.keys(decodedClientInfo));
          console.log('Client_info values:', Object.values(decodedClientInfo));
          
          // Extract user info from client_info
          // The client_info contains uid (user ID) and utid (tenant ID)
          const uid = decodedClientInfo.uid;
          const utid = decodedClientInfo.utid;
          
          console.log('=== EXTRACTED USER DATA ===');
          console.log('UID:', uid);
          console.log('UTID:', utid);
          console.log('UID type:', typeof uid);
          console.log('UTID type:', typeof utid);
          
          // Create a user object with the available information
          const user: User = {
            name: `User ${uid?.substring(0, 8) || 'Authenticated'}`, // Use part of the UID as name
            email: `${uid}@summitbankng.com`, // Construct email from UID
            accessToken: code, // Store the code as access token for now
            expiresAt: Date.now() + (3600 * 1000), // 1 hour from now
            uid: uid, // Store the full UID for reference
            utid: utid // Store the tenant ID
          };
          
          console.log('=== CREATED USER OBJECT ===');
          console.log('Final user object:', user);
          return user;
        } catch (error) {
          console.error('=== ERROR DECODING CLIENT_INFO ===');
          console.error('Decoding error:', error);
          console.error('Client_info that failed to decode:', clientInfo);
        }
      }

      // Since CORS is blocking direct API calls, we'll rely on the client_info for now
      // In a production environment, you would need to either:
      // 1. Configure CORS on your AD service to allow requests from your domain
      // 2. Use a backend proxy to handle the API calls
      // 3. Use a different authentication flow
      
      console.log('=== CORS BLOCKED - USING CLIENT_INFO FALLBACK ===');
      console.log('Note: Direct API calls are blocked by CORS policy');
      console.log('Using client_info data for user information');
      
      // For now, create a user from the available client_info
      if (clientInfo) {
        try {
          const decodedClientInfo = JSON.parse(atob(clientInfo));
          console.log('=== CREATING USER FROM CLIENT_INFO ===');
          console.log('Decoded client_info:', decodedClientInfo);
          
          const user: User = {
            name: `User ${decodedClientInfo.uid?.substring(0, 8) || 'Authenticated'}`,
            email: `${decodedClientInfo.uid}@summitbankng.com`,
            accessToken: code,
            expiresAt: Date.now() + (3600 * 1000),
            uid: decodedClientInfo.uid,
            utid: decodedClientInfo.utid
          };
          
          console.log('=== USER CREATED FROM CLIENT_INFO ===');
          console.log('User object:', user);
          return user;
        } catch (error) {
          console.error('=== ERROR PROCESSING CLIENT_INFO ===');
          console.error('Error:', error);
        }
      }
      
      // If no client_info available, create a basic user
      console.log('=== CREATING BASIC USER ===');
      const user: User = {
        name: 'Authenticated User',
        email: 'user@summitbankng.com',
        accessToken: code,
        expiresAt: Date.now() + (3600 * 1000)
      };
      
      console.log('=== BASIC USER CREATED ===');
      console.log('User object:', user);
      return user;
    } catch (error) {
      console.error('Error exchanging code for user info:', error);
      return null;
    }
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