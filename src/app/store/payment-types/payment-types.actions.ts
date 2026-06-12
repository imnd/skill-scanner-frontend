import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { PaymentType } from './payment-types.model';

export const PaymentTypesActions = createActionGroup({
  source: 'PaymentTypes/API',
  events: {
    'Load PaymentTypes': props<{ paymentTypes: PaymentType[] }>(),
    'Add PaymentType': props<{ paymentType: PaymentType }>(),
    'Upsert PaymentType': props<{ paymentType: PaymentType }>(),
    'Add PaymentTypes': props<{ paymentTypes: PaymentType[] }>(),
    'Upsert PaymentTypes': props<{ paymentTypes: PaymentType[] }>(),
    'Update PaymentType': props<{ paymentType: Update<PaymentType> }>(),
    'Update PaymentTypes': props<{ paymentTypes: Update<PaymentType>[] }>(),
    'Delete PaymentType': props<{ id: string }>(),
    'Delete PaymentTypes': props<{ ids: string[] }>(),
    'Clear PaymentTypes': emptyProps(),

    // Async actions
    'Get PaymentTypes': emptyProps(),
    'Get PaymentTypes Success': props<{ paymentTypes: PaymentType[] }>(),
    'Get PaymentTypes Failure': props<{ error: any }>(),
  },
});

