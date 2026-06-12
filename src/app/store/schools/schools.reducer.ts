import { createFeature, createReducer, on, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { School } from './schools.model';
import { SchoolsActions } from './schools.actions';

export const schoolsFeatureKey = 'schools';

export interface State extends EntityState<School> {
  school: any;
  schoolsCount: number;
}

export const adapter: EntityAdapter<School> = createEntityAdapter<School>();

export const initialState: State = adapter.getInitialState({
  school: null,
  schoolsCount: 0,
});

export const reducer = createReducer(
  initialState,
  on(SchoolsActions.addSchool, (state, action) => adapter.addOne(action.school, state)),
  on(SchoolsActions.upsertSchool, (state, action) => adapter.upsertOne(action.school, state)),
  on(SchoolsActions.addSchools, (state, action) => adapter.addMany(action.schools, state)),
  on(SchoolsActions.upsertSchools, (state, action) => adapter.upsertMany(action.schools, state)),
  on(SchoolsActions.updateSchool, (state, action) => adapter.updateOne(action.school, state)),
  on(SchoolsActions.updateSchools, (state, action) => adapter.updateMany(action.schools, state)),
  on(SchoolsActions.deleteSchool, (state, action) => adapter.removeOne(action.id, state)),
  on(SchoolsActions.deleteSchools, (state, action) => adapter.removeMany(action.ids, state)),
  on(SchoolsActions.loadSchools, (state, action) => adapter.setAll(action.schools, state)),
  on(SchoolsActions.clearSchools, (state) => adapter.removeAll(state)),

  // Custom API success handling
  on(SchoolsActions.getSchoolSuccess, (state, { school }) => ({
    ...state,
    school,
  })),
  on(SchoolsActions.getSchoolsSuccess, (state, { schools, count }) =>
    adapter.setAll(schools, { ...state, schoolsCount: count }),
  ),
  on(SchoolsActions.loadMoreSuccess, (state, { schools }) =>
    adapter.addMany(schools, state),
  ),
);

export const schoolsFeature = createFeature({
  name: schoolsFeatureKey,
  reducer,
  extraSelectors: ({ selectSchoolsState }) => ({
    ...adapter.getSelectors(selectSchoolsState),
  }),
});

export const { selectSchoolsState, selectSchool, selectSchoolsCount } = schoolsFeature;
export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors(selectSchoolsState);

export const selectSchoolById = (schoolId: number | string) =>
  createSelector(selectAll, (schools) =>
    schools.find((s: any) => Number(s.id) === Number(schoolId)) || null
  );

