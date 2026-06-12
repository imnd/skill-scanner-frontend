import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { DurationActions } from './duration.actions';
import { DurationService } from '@/services/duration.service';

@Injectable()
export class DurationEffects {
  private readonly actions$ = inject(Actions);
  private readonly durationService = inject(DurationService);

  getDurations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DurationActions.getDurations),
      switchMap(() =>
        this.durationService.getAll().pipe(
          map((response) => DurationActions.getDurationsSuccess({ durations: response.data })),
          catchError((error) => of(DurationActions.getDurationsFailure({ error })))
        )
      )
    )
  );
}

