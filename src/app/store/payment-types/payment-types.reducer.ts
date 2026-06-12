import { createFeature, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { PaymentType } from './payment-types.model';
import { PaymentTypesActions } from './payment-types.actions';

export const paymentTypesFeatureKey = 'paymentTypes';

export interface State extends EntityState<PaymentType> {
  // additional entities state properties
}

export const adapter: EntityAdapter<PaymentType> = createEntityAdapter<PaymentType>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(PaymentTypesActions.addPaymentType, (state, action) =>
    adapter.addOne(action.paymentType, state),
  ),
  on(PaymentTypesActions.upsertPaymentType, (state, action) =>
    adapter.upsertOne(action.paymentType, state),
  ),
  on(PaymentTypesActions.addPaymentTypes, (state, action) =>
    adapter.addMany(action.paymentTypes, state),
  ),
  on(PaymentTypesActions.upsertPaymentTypes, (state, action) =>
    adapter.upsertMany(action.paymentTypes, state),
  ),
  on(PaymentTypesActions.updatePaymentType, (state, action) =>
    adapter.updateOne(action.paymentType, state),
  ),
  on(PaymentTypesActions.updatePaymentTypes, (state, action) =>
    adapter.updateMany(action.paymentTypes, state),
  ),
  on(PaymentTypesActions.deletePaymentType, (state, action) =>
    adapter.removeOne(action.id, state),
  ),
  on(PaymentTypesActions.deletePaymentTypes, (state, action) =>
    adapter.removeMany(action.ids, state),
  ),
  on(PaymentTypesActions.loadPaymentTypes, (state, action) =>
    adapter.setAll(action.paymentTypes, state),
  ),
  on(PaymentTypesActions.clearPaymentTypes, (state) => adapter.removeAll(state)),

  // Custom API success handling
  on(PaymentTypesActions.getPaymentTypesSuccess, (state, { paymentTypes }) =>
    adapter.setAll(paymentTypes, state),
  ),
);

export const paymentTypesFeature = createFeature({
  name: paymentTypesFeatureKey,
  reducer,
  extraSelectors: ({ selectPaymentTypesState }) => ({
    ...adapter.getSelectors(selectPaymentTypesState),
  }),
});

export const { selectPaymentTypesState } = paymentTypesFeature;
export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors(selectPaymentTypesState);

