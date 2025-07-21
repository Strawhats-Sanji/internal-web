import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page';
import { DashboardPageComponent } from './dashboard-page/dashboard-page';
import { ReturnsPageComponent } from './returns-page/returns-page';
import { AuthCallbackComponent } from './auth-callback/auth-callback';
import { AuthGuard } from './guards/auth.guard';
import { VerificationPageComponent } from './verification-page/verification-page.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard] },
  { path: 'returns', component: ReturnsPageComponent, canActivate: [AuthGuard] },
  { path: 'verification', component: VerificationPageComponent, canActivate: [AuthGuard] },
  { path: 'auth/callback', component: AuthCallbackComponent },
  { path: 'auth/v1/callback', component: AuthCallbackComponent },
];
