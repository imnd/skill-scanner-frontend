import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BreadcrumbsState } from './breadcrumbs.reducer';
import { environment } from '@/environments/environment';

export const selectBreadcrumbsState =
  createFeatureSelector<BreadcrumbsState>('breadcrumbs');

export const selectBreadcrumbs = createSelector(
  selectBreadcrumbsState,
  (state) => state.breadcrumbs.map(b => ({
    ...b,
    href: environment.baseUrl + b.href,
  }))
);
