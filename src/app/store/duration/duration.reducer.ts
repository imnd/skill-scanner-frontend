import { createFeature, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Duration } from './duration.model';
import { DurationActions } from './duration.actions';

export const durationFeatureKey = 'duration';

export interface State extends EntityState<Duration> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Duration> = createEntityAdapter<Duration>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(DurationActions.addDuration, (state, action) => adapter.addOne(action.duration, state)),
  on(DurationActions.upsertDuration, (state, action) => adapter.upsertOne(action.duration, state)),
  on(DurationActions.addDurations, (state, action) => adapter.addMany(action.durations, state)),
  on(DurationActions.upsertDurations, (state, action) =>
    adapter.upsertMany(action.durations, state),
  ),
  on(DurationActions.updateDuration, (state, action) => adapter.updateOne(action.duration, state)),
  on(DurationActions.updateDurations, (state, action) =>
    adapter.updateMany(action.durations, state),
  ),
  on(DurationActions.deleteDuration, (state, action) => adapter.removeOne(action.id, state)),
  on(DurationActions.deleteDurations, (state, action) => adapter.removeMany(action.ids, state)),
  on(DurationActions.loadDurations, (state, action) => adapter.setAll(action.durations, state)),
  on(DurationActions.clearDurations, (state) => adapter.removeAll(state)),

  // Custom API success handling
  on(DurationActions.getDurationsSuccess, (state, { durations }) =>
    adapter.setAll(durations, state),
  ),
);

export const durationFeature = createFeature({
  name: durationFeatureKey,
  reducer,
  extraSelectors: ({ selectDurationState }) => ({
    ...adapter.getSelectors(selectDurationState),
  }),
});

export const { selectDurationState } = durationFeature;
export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors(selectDurationState);

