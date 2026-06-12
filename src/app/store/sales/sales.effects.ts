import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { SalesActions } from './sales.actions';
import { SalesService } from '@/services/sales.service';

@Injectable()
export class SalesEffects {
  private readonly actions$ = inject(Actions);
  private readonly salesService = inject(SalesService);

  getSales$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SalesActions.getSales),
      switchMap(() =>
        this.salesService.getSales().pipe(
          map((response) => SalesActions.getSalesSuccess({ sales: response.data })),
          catchError((error) => of(SalesActions.getSalesFailure({ error })))
        )
      )
    )
  );
}

