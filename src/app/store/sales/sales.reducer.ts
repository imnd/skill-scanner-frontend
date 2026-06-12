import { createFeature, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Sale } from './sales.model';
import { SalesActions } from './sales.actions';

export const salesFeatureKey = 'sales';

export interface State extends EntityState<Sale> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Sale> = createEntityAdapter<Sale>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(SalesActions.addSale, (state, action) => adapter.addOne(action.sale, state)),
  on(SalesActions.upsertSale, (state, action) => adapter.upsertOne(action.sale, state)),
  on(SalesActions.addSales, (state, action) => adapter.addMany(action.sales, state)),
  on(SalesActions.upsertSales, (state, action) => adapter.upsertMany(action.sales, state)),
  on(SalesActions.updateSale, (state, action) => adapter.updateOne(action.sale, state)),
  on(SalesActions.updateSales, (state, action) => adapter.updateMany(action.sales, state)),
  on(SalesActions.deleteSale, (state, action) => adapter.removeOne(action.id, state)),
  on(SalesActions.deleteSales, (state, action) => adapter.removeMany(action.ids, state)),
  on(SalesActions.loadSales, (state, action) => adapter.setAll(action.sales, state)),
  on(SalesActions.clearSales, (state) => adapter.removeAll(state)),

  // Custom API success handling
  on(SalesActions.getSalesSuccess, (state, { sales }) =>
    adapter.setAll(sales, state),
  ),
);

export const salesFeature = createFeature({
  name: salesFeatureKey,
  reducer,
  extraSelectors: ({ selectSalesState }) => ({
    ...adapter.getSelectors(selectSalesState),
  }),
});

export const { selectSalesState } = salesFeature;
export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors(selectSalesState);

