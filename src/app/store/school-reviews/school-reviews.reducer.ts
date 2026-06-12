import { createFeature, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { SchoolReview } from './school-reviews.model';
import { SchoolReviewsActions } from './school-reviews.actions';

export const schoolReviewsFeatureKey = 'schoolReviews';

export interface State extends EntityState<SchoolReview> {
  // additional entities state properties
}

export const adapter: EntityAdapter<SchoolReview> = createEntityAdapter<SchoolReview>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(SchoolReviewsActions.addSchoolReview, (state, action) =>
    adapter.addOne(action.schoolReview, state),
  ),
  on(SchoolReviewsActions.upsertSchoolReview, (state, action) =>
    adapter.upsertOne(action.schoolReview, state),
  ),
  on(SchoolReviewsActions.addSchoolReviews, (state, action) =>
    adapter.addMany(action.schoolReviews, state),
  ),
  on(SchoolReviewsActions.upsertSchoolReviews, (state, action) =>
    adapter.upsertMany(action.schoolReviews, state),
  ),
  on(SchoolReviewsActions.updateSchoolReview, (state, action) =>
    adapter.updateOne(action.schoolReview, state),
  ),
  on(SchoolReviewsActions.updateSchoolReviews, (state, action) =>
    adapter.updateMany(action.schoolReviews, state),
  ),
  on(SchoolReviewsActions.deleteSchoolReview, (state, action) =>
    adapter.removeOne(action.id, state),
  ),
  on(SchoolReviewsActions.deleteSchoolReviews, (state, action) =>
    adapter.removeMany(action.ids, state),
  ),
  on(SchoolReviewsActions.loadSchoolReviews, (state, action) =>
    adapter.setAll(action.schoolReviews, state),
  ),
  on(SchoolReviewsActions.clearSchoolReviews, (state) => adapter.removeAll(state)),

  // Custom API success handling
  on(SchoolReviewsActions.getLastReviewsSuccess, (state, { lastReviews }) =>
    adapter.setAll(lastReviews, state),
  ),
);

export const schoolReviewsFeature = createFeature({
  name: schoolReviewsFeatureKey,
  reducer,
  extraSelectors: ({ selectSchoolReviewsState }) => ({
    ...adapter.getSelectors(selectSchoolReviewsState),
  }),
});

export const { selectSchoolReviewsState } = schoolReviewsFeature;
export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors(selectSchoolReviewsState);

