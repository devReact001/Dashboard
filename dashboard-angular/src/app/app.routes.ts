import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

// Auth guard — redirects to /login if no token
export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  if (typeof localStorage !== 'undefined' && localStorage.getItem('token')) {
    return true;
  }
  return router.createUrlTree(['/login']);
};

export const routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full' as const,
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
