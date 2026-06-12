import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Sale } from './sales.model';

export const SalesActions = createActionGroup({
  source: 'Sales/API',
  events: {
    'Load Sales': props<{ sales: Sale[] }>(),
    'Add Sale': props<{ sale: Sale }>(),
    'Upsert Sale': props<{ sale: Sale }>(),
    'Add Sales': props<{ sales: Sale[] }>(),
    'Upsert Sales': props<{ sales: Sale[] }>(),
    'Update Sale': props<{ sale: Update<Sale> }>(),
    'Update Sales': props<{ sales: Update<Sale>[] }>(),
    'Delete Sale': props<{ id: string }>(),
    'Delete Sales': props<{ ids: string[] }>(),
    'Clear Sales': emptyProps(),

    // Async actions
    'Get Sales': emptyProps(),
    'Get Sales Success': props<{ sales: Sale[] }>(),
    'Get Sales Failure': props<{ error: any }>(),
  },
});

