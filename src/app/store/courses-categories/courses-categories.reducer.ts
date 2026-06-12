import { createFeature, createReducer, on, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { CoursesCategory } from './courses-categories.model';
import { CoursesCategoriesActions } from './courses-categories.actions';

export const coursesCategoriesFeatureKey = 'coursesCategories';

export interface State extends EntityState<CoursesCategory> {
  topCategories: CoursesCategory[];
}

export const adapter: EntityAdapter<CoursesCategory> = createEntityAdapter<CoursesCategory>();

export const initialState: State = adapter.getInitialState({
  topCategories: [],
});

export const reducer = createReducer(
  initialState,
  on(CoursesCategoriesActions.addCoursesCategory, (state, action) =>
    adapter.addOne(action.coursesCategory, state),
  ),
  on(CoursesCategoriesActions.upsertCoursesCategory, (state, action) =>
    adapter.upsertOne(action.coursesCategory, state),
  ),
  on(CoursesCategoriesActions.addCoursesCategories, (state, action) =>
    adapter.addMany(action.coursesCategories, state),
  ),
  on(CoursesCategoriesActions.upsertCoursesCategories, (state, action) =>
    adapter.upsertMany(action.coursesCategories, state),
  ),
  on(CoursesCategoriesActions.updateCoursesCategory, (state, action) =>
    adapter.updateOne(action.coursesCategory, state),
  ),
  on(CoursesCategoriesActions.updateCoursesCategories, (state, action) =>
    adapter.updateMany(action.coursesCategories, state),
  ),
  on(CoursesCategoriesActions.deleteCoursesCategory, (state, action) =>
    adapter.removeOne(action.id, state),
  ),
  on(CoursesCategoriesActions.deleteCoursesCategories, (state, action) =>
    adapter.removeMany(action.ids, state),
  ),
  on(CoursesCategoriesActions.loadCoursesCategories, (state, action) =>
    adapter.setAll(action.coursesCategories, state),
  ),
  on(CoursesCategoriesActions.clearCoursesCategories, (state) => adapter.removeAll(state)),

  // Custom API success handling
  on(CoursesCategoriesActions.getCoursesCategoriesSuccess, (state, { categories }) =>
    adapter.setAll(categories, state),
  ),
  on(CoursesCategoriesActions.getTopCategoriesSuccess, (state, { topCategories }) => ({
    ...state,
    topCategories,
  })),
);

export const coursesCategoriesFeature = createFeature({
  name: coursesCategoriesFeatureKey,
  reducer,
  extraSelectors: ({ selectCoursesCategoriesState }) => ({
    ...adapter.getSelectors(selectCoursesCategoriesState),
  }),
});

export const { selectCoursesCategoriesState, selectTopCategories } = coursesCategoriesFeature;
export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors(selectCoursesCategoriesState);

export const selectCategoryById = (catId: number | string) =>
  createSelector(selectAll, (categories: CoursesCategory[]) =>
    categories.find((cat: CoursesCategory) => Number(cat.id) === Number(catId)) || null
  );

