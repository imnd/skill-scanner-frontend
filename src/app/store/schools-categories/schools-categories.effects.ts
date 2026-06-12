import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { SchoolsCategoriesActions } from './schools-categories.actions';
import { SchoolsCategoriesService } from '@/services/schools-categories.service';

@Injectable()
export class SchoolsCategoriesEffects {
  private readonly actions$ = inject(Actions);
  private readonly schoolsCategoriesService = inject(SchoolsCategoriesService);

  getCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SchoolsCategoriesActions.getCategories),
      switchMap(() =>
        this.schoolsCategoriesService.getAll().pipe(
          map((response) => SchoolsCategoriesActions.getCategoriesSuccess({ categories: response.data })),
          catchError((error) => of(SchoolsCategoriesActions.getCategoriesFailure({ error })))
        )
      )
    )
  );
}

