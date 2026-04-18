export const routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full' as const, // 🔥 FIX
  },
];