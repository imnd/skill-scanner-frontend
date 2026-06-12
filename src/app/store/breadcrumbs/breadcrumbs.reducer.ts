import { createReducer, on } from '@ngrx/store';
import { Breadcrumb } from './breadcrumbs.model';
import { setBreadcrumbs } from './breadcrumbs.actions';

export interface BreadcrumbsState {
  breadcrumbs: Breadcrumb[];
}

export const initialState: BreadcrumbsState = {
  breadcrumbs: [],
};

export const reducer = createReducer(
  initialState,
  on(setBreadcrumbs, (state, { breadcrumbs }) => ({
    ...state,
    breadcrumbs: [
      ...breadcrumbs,
    ],
  }))
);
