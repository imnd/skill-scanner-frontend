import { createFeature, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { SchoolsCategory } from './schools-categories.model';
import { SchoolsCategoriesActions } from './schools-categories.actions';

export const schoolsCategoriesFeatureKey = 'schoolsCategories';

export interface State extends EntityState<SchoolsCategory> {
  // additional entities state properties
}

export const adapter: EntityAdapter<SchoolsCategory> = createEntityAdapter<SchoolsCategory>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(SchoolsCategoriesActions.addSchoolsCategory, (state, action) =>
    adapter.addOne(action.schoolsCategory, state),
  ),
  on(SchoolsCategoriesActions.upsertSchoolsCategory, (state, action) =>
    adapter.upsertOne(action.schoolsCategory, state),
  ),
  on(SchoolsCategoriesActions.addSchoolsCategories, (state, action) =>
    adapter.addMany(action.schoolsCategories, state),
  ),
  on(SchoolsCategoriesActions.upsertSchoolsCategories, (state, action) =>
    adapter.upsertMany(action.schoolsCategories, state),
  ),
  on(SchoolsCategoriesActions.updateSchoolsCategory, (state, action) =>
    adapter.updateOne(action.schoolsCategory, state),
  ),
  on(SchoolsCategoriesActions.updateSchoolsCategories, (state, action) =>
    adapter.updateMany(action.schoolsCategories, state),
  ),
  on(SchoolsCategoriesActions.deleteSchoolsCategory, (state, action) =>
    adapter.removeOne(action.id, state),
  ),
  on(SchoolsCategoriesActions.deleteSchoolsCategories, (state, action) =>
    adapter.removeMany(action.ids, state),
  ),
  on(SchoolsCategoriesActions.loadSchoolsCategories, (state, action) =>
    adapter.setAll(action.schoolsCategories, state),
  ),
  on(SchoolsCategoriesActions.clearSchoolsCategories, (state) => adapter.removeAll(state)),

  // Custom API success handling
  on(SchoolsCategoriesActions.getCategoriesSuccess, (state, { categories }) =>
    adapter.setAll(categories, state),
  ),
);

export const schoolsCategoriesFeature = createFeature({
  name: schoolsCategoriesFeatureKey,
  reducer,
  extraSelectors: ({ selectSchoolsCategoriesState }) => ({
    ...adapter.getSelectors(selectSchoolsCategoriesState),
  }),
});

export const { selectSchoolsCategoriesState } = schoolsCategoriesFeature;
export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors(selectSchoolsCategoriesState);

