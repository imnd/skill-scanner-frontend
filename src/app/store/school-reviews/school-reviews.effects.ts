import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { SchoolReviewsActions } from './school-reviews.actions';
import { SchoolReviewsService } from '@/services/school-reviews.service';

@Injectable()
export class SchoolReviewsEffects {
  private readonly actions$ = inject(Actions);
  private readonly schoolReviewsService = inject(SchoolReviewsService);

  getLastReviews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SchoolReviewsActions.getLastReviews),
      switchMap(() =>
        this.schoolReviewsService.getLastReviews().pipe(
          map((response) => SchoolReviewsActions.getLastReviewsSuccess({ lastReviews: response.data })),
          catchError((error) => of(SchoolReviewsActions.getLastReviewsFailure({ error })))
        )
      )
    )
  );
}

