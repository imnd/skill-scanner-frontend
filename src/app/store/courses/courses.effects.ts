import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CoursesActions } from './courses.actions';
import { CoursesService } from '@/services/courses.service';

@Injectable()
export class CoursesEffects {
  private readonly actions$ = inject(Actions);
  private readonly coursesService = inject(CoursesService);

  getCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.getCourses),
      switchMap(({ filters }) =>
        this.coursesService.getCourses(filters).pipe(
          map((response) =>
            CoursesActions.getCoursesSuccess({
              courses: response.data,
              count: response.meta?.total || 0,
            })
          ),
          catchError((error) => of(CoursesActions.getCoursesFailure({ error })))
        )
      )
    )
  );

  loadMore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.loadMore),
      switchMap(({ filters }) =>
        this.coursesService.getCourses(filters).pipe(
          map((response) => CoursesActions.loadMoreSuccess({ courses: response.data })),
          catchError((error) => of(CoursesActions.loadMoreFailure({ error })))
        )
      )
    )
  );
}
