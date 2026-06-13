import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { SchoolsActions } from './schools.actions';
import { SchoolsService } from '@/services/schools.service';

@Injectable()
export class SchoolsEffects {
  private readonly actions$ = inject(Actions);
  private readonly schoolsService = inject(SchoolsService);

  getSchool$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SchoolsActions.getSchool),
      switchMap(({ slug }) =>
        this.schoolsService.getSchool(slug).pipe(
          map((response) => SchoolsActions.getSchoolSuccess({ school: response.data })),
          catchError((error) => of(SchoolsActions.getSchoolFailure({ error })))
        )
      )
    )
  );

  getSchools$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SchoolsActions.getSchools),
      switchMap(({ filters }) =>
        this.schoolsService.getSchools(filters).pipe(
          map((response) =>
            SchoolsActions.getSchoolsSuccess({
              schools: response.data,
              count: response.meta.total || 0,
            })
          ),
          catchError((error) => of(SchoolsActions.getSchoolsFailure({ error })))
        )
      )
    )
  );

  loadMore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SchoolsActions.loadMore),
      switchMap(({ filters }) =>
        this.schoolsService.getSchools(filters).pipe(
          map((response) => SchoolsActions.loadMoreSuccess({ schools: response.data })),
          catchError((error) => of(SchoolsActions.loadMoreFailure({ error })))
        )
      )
    )
  );
}

