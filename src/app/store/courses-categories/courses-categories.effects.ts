import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CoursesCategoriesActions } from './courses-categories.actions';
import { CoursesCategoriesService } from '@/services/courses-categories.service';

@Injectable()
export class CoursesCategoriesEffects {
  private readonly actions$ = inject(Actions);
  private readonly coursesCategoriesService = inject(CoursesCategoriesService);

  getCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesCategoriesActions.getCoursesCategories),
      switchMap(() =>
        this.coursesCategoriesService.getCategories().pipe(
          map((response) => CoursesCategoriesActions.getCoursesCategoriesSuccess({ categories: response.data })),
          catchError((error) => of(CoursesCategoriesActions.getCoursesCategoriesFailure({ error })))
        )
      )
    )
  );

  getTopCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesCategoriesActions.getTopCategories),
      switchMap(({ limit }) =>
        this.coursesCategoriesService.getTopCategories(limit).pipe(
          map((response) => CoursesCategoriesActions.getTopCategoriesSuccess({ topCategories: response.data })),
          catchError((error) => of(CoursesCategoriesActions.getTopCategoriesFailure({ error })))
        )
      )
    )
  );
}
