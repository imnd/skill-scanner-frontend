import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home.routes').then(m => m.HOME_ROUTES)
  },
  {
    path: 'courses-categories',
    loadComponent: () => import('./pages/courses-categories/courses-categories').then(m => m.CoursesCategories)
  },
  {
    path: 'courses/:slug',
    loadComponent: () => import('./pages/courses/courses').then(m => m.Courses)
  },
  {
    path: 'courses',
    loadComponent: () => import('./pages/courses/courses').then(m => m.Courses)
  },
  {
    path: 'schools',
    loadComponent: () => import('./pages/schools/schools').then(m => m.Schools)
  },
  {
    path: 'sales',
    loadComponent: () => import('./pages/sales/sales').then(m => m.Sales)
  },
  {
    path: 'posts',
    loadComponent: () => import('./pages/posts/posts').then(m => m.Posts)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
