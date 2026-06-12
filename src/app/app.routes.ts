import { Routes } from '@angular/router';
import { Courses } from '@/app/pages/courses/courses';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home.routes').then(m => m.HOME_ROUTES)
  },
  {
    path: 'courses',
    loadComponent: () => import('./pages/courses/courses').then(m => m.Courses)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
