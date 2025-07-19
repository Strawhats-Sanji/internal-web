import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page';
import { DashboardPageComponent } from './dashboard-page/dashboard-page';
import { AuthCallbackComponent } from './auth-callback/auth-callback';

export const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'dashboard', component: DashboardPageComponent },
  { path: 'auth/callback', component: AuthCallbackComponent },
];
