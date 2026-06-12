import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { SchoolsCategory } from './schools-categories.model';

export const SchoolsCategoriesActions = createActionGroup({
  source: 'SchoolsCategories/API',
  events: {
    'Load SchoolsCategories': props<{ schoolsCategories: SchoolsCategory[] }>(),
    'Add SchoolsCategory': props<{ schoolsCategory: SchoolsCategory }>(),
    'Upsert SchoolsCategory': props<{ schoolsCategory: SchoolsCategory }>(),
    'Add SchoolsCategories': props<{ schoolsCategories: SchoolsCategory[] }>(),
    'Upsert SchoolsCategories': props<{ schoolsCategories: SchoolsCategory[] }>(),
    'Update SchoolsCategory': props<{ schoolsCategory: Update<SchoolsCategory> }>(),
    'Update SchoolsCategories': props<{ schoolsCategories: Update<SchoolsCategory>[] }>(),
    'Delete SchoolsCategory': props<{ id: string }>(),
    'Delete SchoolsCategories': props<{ ids: string[] }>(),
    'Clear SchoolsCategories': emptyProps(),

    // Async actions
    'Get Categories': emptyProps(),
    'Get Categories Success': props<{ categories: SchoolsCategory[] }>(),
    'Get Categories Failure': props<{ error: any }>(),
  },
});

