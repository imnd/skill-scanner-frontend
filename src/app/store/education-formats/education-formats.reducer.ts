import { createFeature, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { EducationFormat } from './education-formats.model';
import { EducationFormatsActions } from './education-formats.actions';

export const educationFormatsFeatureKey = 'educationFormats';

export interface State extends EntityState<EducationFormat> {
  // additional entities state properties
}

export const adapter: EntityAdapter<EducationFormat> = createEntityAdapter<EducationFormat>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(EducationFormatsActions.addEducationFormat, (state, action) =>
    adapter.addOne(action.educationFormat, state),
  ),
  on(EducationFormatsActions.upsertEducationFormat, (state, action) =>
    adapter.upsertOne(action.educationFormat, state),
  ),
  on(EducationFormatsActions.addEducationFormats, (state, action) =>
    adapter.addMany(action.educationFormats, state),
  ),
  on(EducationFormatsActions.upsertEducationFormats, (state, action) =>
    adapter.upsertMany(action.educationFormats, state),
  ),
  on(EducationFormatsActions.updateEducationFormat, (state, action) =>
    adapter.updateOne(action.educationFormat, state),
  ),
  on(EducationFormatsActions.updateEducationFormats, (state, action) =>
    adapter.updateMany(action.educationFormats, state),
  ),
  on(EducationFormatsActions.deleteEducationFormat, (state, action) =>
    adapter.removeOne(action.id, state),
  ),
  on(EducationFormatsActions.deleteEducationFormats, (state, action) =>
    adapter.removeMany(action.ids, state),
  ),
  on(EducationFormatsActions.loadEducationFormats, (state, action) =>
    adapter.setAll(action.educationFormats, state),
  ),
  on(EducationFormatsActions.clearEducationFormats, (state) => adapter.removeAll(state)),

  // Custom API success handling
  on(EducationFormatsActions.getEducationFormatsSuccess, (state, { educationFormats }) =>
    adapter.setAll(educationFormats, state),
  ),
);

export const educationFormatsFeature = createFeature({
  name: educationFormatsFeatureKey,
  reducer,
  extraSelectors: ({ selectEducationFormatsState }) => ({
    ...adapter.getSelectors(selectEducationFormatsState),
  }),
});

export const { selectEducationFormatsState } = educationFormatsFeature;
export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors(selectEducationFormatsState);

