import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

// Reducers
import { reducer as breadcrumbsReducer } from './store/breadcrumbs/breadcrumbs.reducer';
import { reducer as coursesCategoriesReducer } from './store/courses-categories/courses-categories.reducer';
import { reducer as coursesReducer } from './store/courses/courses.reducer';
import { reducer as durationReducer } from './store/duration/duration.reducer';
import { reducer as educationFormatsReducer } from './store/education-formats/education-formats.reducer';
import { reducer as paymentTypesReducer } from './store/payment-types/payment-types.reducer';
import { reducer as postsReducer } from './store/posts/posts.reducer';
import { reducer as salesReducer } from './store/sales/sales.reducer';
import { reducer as schoolReviewsReducer } from './store/school-reviews/school-reviews.reducer';
import { reducer as schoolsCategoriesReducer } from './store/schools-categories/schools-categories.reducer';
import { reducer as schoolsReducer } from './store/schools/schools.reducer';

// Effects
import { CoursesCategoriesEffects } from './store/courses-categories/courses-categories.effects';
import { CoursesEffects } from './store/courses/courses.effects';
import { DurationEffects } from './store/duration/duration.effects';
import { EducationFormatsEffects } from './store/education-formats/education-formats.effects';
import { PaymentTypesEffects } from './store/payment-types/payment-types.effects';
import { PostsEffects } from './store/posts/posts.effects';
import { SalesEffects } from './store/sales/sales.effects';
import { SchoolReviewsEffects } from './store/school-reviews/school-reviews.effects';
import { SchoolsCategoriesEffects } from './store/schools-categories/schools-categories.effects';
import { SchoolsEffects } from './store/schools/schools.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideStore({
      breadcrumbs: breadcrumbsReducer,
      coursesCategories: coursesCategoriesReducer,
      courses: coursesReducer,
      duration: durationReducer,
      educationFormats: educationFormatsReducer,
      paymentTypes: paymentTypesReducer,
      posts: postsReducer,
      sales: salesReducer,
      schoolReviews: schoolReviewsReducer,
      schoolsCategories: schoolsCategoriesReducer,
      schools: schoolsReducer,
    }, {
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
      }
    }),
    provideEffects([
      CoursesCategoriesEffects,
      CoursesEffects,
      DurationEffects,
      EducationFormatsEffects,
      PaymentTypesEffects,
      PostsEffects,
      SalesEffects,
      SchoolReviewsEffects,
      SchoolsCategoriesEffects,
      SchoolsEffects,
    ]),
  ]
};

