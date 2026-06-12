import { createAction, props } from '@ngrx/store';
import { Breadcrumb } from './breadcrumbs.model';

export const setBreadcrumbs = createAction(
  '[Breadcrumbs] Set Breadcrumbs',
  props<{ breadcrumbs: Breadcrumb[] }>()
);
