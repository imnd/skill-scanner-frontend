import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { PaymentTypesActions } from './payment-types.actions';
import { PaymentTypesService } from '@/services/payment-types.service';

@Injectable()
export class PaymentTypesEffects {
  private readonly actions$ = inject(Actions);
  private readonly paymentTypesService = inject(PaymentTypesService);

  getPaymentTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentTypesActions.getPaymentTypes),
      switchMap(() =>
        this.paymentTypesService.getAll().pipe(
          map((response) => PaymentTypesActions.getPaymentTypesSuccess({ paymentTypes: response.data })),
          catchError((error) => of(PaymentTypesActions.getPaymentTypesFailure({ error })))
        )
      )
    )
  );
}

